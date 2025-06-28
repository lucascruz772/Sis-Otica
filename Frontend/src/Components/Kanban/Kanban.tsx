import React, { useState, useContext, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { ThemeContext } from "../../ThemeContext/themecontext";

// Status do Kanban
const KANBAN_STATUS = [
    { key: "A", label: "SOLICITADO" },
    { key: "L", label: "LABORATÓRIO" },
    { key: "J", label: "LOJA" },
    { key: "E", label: "ENTREGUE" },
    { key: "F", label: "FINALIZADO" },
    { key: "C", label: "CANCELADO" },
];

// Interface da ordem
interface Ordem {
    id: number;
    status: string;
    cliente: string;
    servico: string;
    vendedor: string;
    lenses: string;
    dataPedido: string;
    telefone: string;
    previsaoEntrega: string;
}

const Kanban: React.FC = () => {
    // Estado das ordens, inicia vazio e é preenchido pela API
    const [ordens, setOrdens] = useState<Ordem[]>([]);
    // Mapas de nomes
    const [clientesMap, setClientesMap] = useState<Record<string, string>>({});
    const [servicosMap, setServicosMap] = useState<Record<string, string>>({});
    const [usuariosMap, setUsuariosMap] = useState<Record<string, string>>({});
    const { theme } = useContext(ThemeContext);

    // Referências para o board e colunas
    const boardRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [boardMinHeight, setBoardMinHeight] = useState<number | undefined>(undefined);

    // Aplica o tema escuro/claro
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    // Carrega dados auxiliares (clientes, serviços, usuários/vendedores)
    useEffect(() => {
        // Clientes
        fetch("/api/v1/clientes/")
            .then(res => res.json())
            .then(clientes => {
                // Garante que clientes seja um array (paginado ou não)
                const lista = Array.isArray(clientes) ? clientes : (clientes.results || []);
                const map: Record<string, string> = {};
                lista.forEach((c: { id: number; nome?: string; NOME?: string; razao_social?: string; RAZAO_SOCIAL?: string }) => {
                    map[String(c.id)] = c.nome || c.NOME || c.razao_social || c.RAZAO_SOCIAL || String(c.id);
                });
                setClientesMap(map);
            });
        // Serviços
        fetch("/api/v1/servicos/")
            .then(res => res.json())
            .then(servicos => {
                // Garante que servicos seja um array (paginado ou não)
                const lista = Array.isArray(servicos) ? servicos : (servicos.results || []);
                const map: Record<string, string> = {};
                lista.forEach((s: { id: number; nome?: string; NOME?: string }) => {
                    map[String(s.id)] = s.nome || s.NOME || String(s.id);
                });
                setServicosMap(map);
            });
        // Usuários (vendedores)
        fetch("/api/v1/usuarios/")
            .then(res => res.json())
            .then(usuarios => {
                // Garante que usuarios seja um array (paginado ou não)
                const lista = Array.isArray(usuarios) ? usuarios : (usuarios.results || []);
                const map: Record<string, string> = {};
                lista.forEach((u: { id: number; nome?: string; NOME?: string; username?: string }) => {
                    map[String(u.id)] = u.nome || u.NOME || u.username || String(u.id);
                });
                setUsuariosMap(map);
            });
    }, []);

    // Carrega ordens da API ao iniciar (NÃO depende mais dos mapas)
    useEffect(() => {
        fetch("/api/v1/kanban/")
            .then(res => {
                if (!res.ok) throw new Error('Não encontrado');
                return res.json();
            })
            .then(data => {
                const statusMap = {
                    solicitado: "A",
                    laboratorio: "L",
                    loja: "J",
                    entregue: "E",
                    finalizado: "F",
                    cancelado: "C"
                };
                let ordens: Ordem[] = [];
                Object.entries(statusMap).forEach(([apiKey, statusKey]) => {
                    if (data[apiKey]) {
                        ordens = ordens.concat(
                            data[apiKey].map((item: Record<string, unknown>) => ({
                                id: Number(item.id),
                                status: String(item.STATUS || statusKey),
                                cliente: String(item.CLIENTE ?? ''),
                                servico: String(item.SERVICO ?? ''),
                                vendedor: String(item.VENDEDOR ?? ''),
                                lenses: String(item.LENTES ?? ''),
                                dataPedido: String(item.DATA_SOLICITACAO || ''),
                                telefone: '', // Preencher se disponível
                                previsaoEntrega: String(item.PREVISAO_ENTREGA || '')
                            }))
                        );
                    }
                });
                setOrdens(ordens);
            })
            .catch(() => {
                setOrdens([]);
            });
    }, []);

    // Atualiza a altura do board para acompanhar a maior coluna
    useEffect(() => {
        if (columnRefs.current.length > 0) {
            const max = Math.max(
                ...columnRefs.current.map((col) => (col ? col.offsetHeight : 0)),
                0
            );
            setBoardMinHeight(max);
        }
    }, [ordens]);

    // Função de drag and drop
    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Agrupa as ordens por status
        const ordensByStatus = KANBAN_STATUS.reduce((acc, s) => {
            acc[s.key] = ordens.filter(o => o.status === s.key);
            return acc;
        }, {} as Record<string, Ordem[]>);

        // Identifica as listas de origem e destino
        const sourceStatus = KANBAN_STATUS[Number(source.droppableId)].key;
        const destStatus = KANBAN_STATUS[Number(destination.droppableId)].key;
        const sourceList = Array.from(ordensByStatus[sourceStatus]);
        const destList = Array.from(ordensByStatus[destStatus]);

        // Remove do source
        const [movedOrder] = sourceList.splice(source.index, 1);
        movedOrder.status = destStatus;
        // Adiciona no destino
        destList.splice(destination.index, 0, movedOrder);

        // Atualiza os arrays
        ordensByStatus[sourceStatus] = sourceList;
        ordensByStatus[destStatus] = destList;

        // Junta todos na ordem das colunas
        const newOrdens = KANBAN_STATUS.flatMap(s => ordensByStatus[s.key]);

        // Atualiza no backend antes de atualizar local
        try {
            const resp = await fetch(`https://sgosistemas.com.br/api/v1/cards/${movedOrder.id}/update-status/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: destStatus })
            });
            if (!resp.ok) throw new Error('Erro ao atualizar status no servidor.');
            setOrdens(newOrdens);
        } catch {
            alert("Erro ao atualizar status no servidor. O card será revertido.");
            // Reverte visualmente
            setOrdens(ordens);
        }
    };

    // Função para mapear nomes dinâmicos ao renderizar
    function getNomeCliente(id: string) {
        return clientesMap[id] || id;
    }
    function getNomeServico(id: string) {
        return servicosMap[id] || id;
    }
    function getNomeVendedor(id: string) {
        return usuariosMap[id] || id;
    }

    // Agrupa as ordens por status para renderização
    const ordensByStatus = KANBAN_STATUS.reduce((acc, s) => {
        acc[s.key] = ordens.filter(o => o.status === s.key);
        return acc;
    }, {} as Record<string, Ordem[]>);

    return (
        <section className="w-full min-h-[94vh] py-6 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="sticky top-20 left-0 w-full z-10 bg-white dark:bg-gray-900">
                    <h3 className="text-center text-lg md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-gray-100">Kanban - Últimos 10 Dias</h3>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div
                        className="kanban-board grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-6 pb-2 min-w-0 w-full mx-auto items-start overflow-x-auto"
                        ref={boardRef}
                        style={boardMinHeight ? { minHeight: boardMinHeight } : {}}
                    >
                        {KANBAN_STATUS.map((col, index) => (
                            <Droppable droppableId={index.toString()} key={col.key}>
                                {(provided) => (
                                    <div
                                        ref={el => {
                                            provided.innerRef(el);
                                            columnRefs.current[index] = el;
                                        }}
                                        {...provided.droppableProps}
                                        className="kanban-column relative w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-4 flex-shrink-0 h-auto z-10 max-h-[calc(100vh-180px)] overflow-y-auto"
                                    >
                                        <h6 className="text-center font-semibold text-base xl:text-lg mb-2 text-pink-600 dark:text-pink-400 sticky top-0 bg-gray-100 dark:bg-gray-800 z-20 pb-2">{col.label}</h6>
                                        <div className="flex flex-col gap-3 items-center">
                                            {ordensByStatus[col.key]?.map((os, idx) => (
                                                <Draggable key={os.id} draggableId={os.id.toString()} index={idx}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="w-full"
                                                        >
                                                            <motion.div
                                                                className="kanban-card w-full max-w-[420px] bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-3 mb-0 shadow-md hover:shadow-lg transition-shadow duration-200 text-sm xl:text-base mx-auto"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                            >
                                                                <div className="font-bold text-blue-600 dark:text-white mb-1 text-base">OS #{os.id}</div>
                                                                <div><b className="text-gray-700 dark:text-white">Serviço:</b> <span className="dark:text-white">{getNomeServico(os.servico)}</span></div>
                                                                <div><b className="text-gray-700 dark:text-white">Cliente:</b> <span className="dark:text-white">{getNomeCliente(os.cliente)}</span></div>
                                                                <div><b className="text-gray-700 dark:text-white">Vendedor:</b> <span className="dark:text-white">{getNomeVendedor(os.vendedor)}</span></div>
                                                                <div><b className="text-gray-700 dark:text-white">Lentes:</b> <span className="dark:text-white">{os.lenses}</span></div>
                                                                <div><b className="text-gray-700 dark:text-white">Data Pedido:</b> <span className="dark:text-white">{os.dataPedido}</span></div>
                                                                <div className="kanban-card-footer mt-2 flex justify-between items-center">
                                                                    <span className="text-gray-700 dark:text-white"><b>Contato:</b> <span className="dark:text-white">{os.telefone}</span></span>
                                                                    <a
                                                                        href={`https://wa.me/55${os.telefone.replace(/\\D/g, "")}?text=Olá! ${os.cliente}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-green-500 hover:text-green-700"
                                                                    >
                                                                        <span role="img" aria-label="WhatsApp">💬</span>
                                                                    </a>
                                                                </div>
                                                                <div><b className="text-gray-700 dark:text-white">Previsão Entrega:</b> <span className="dark:text-white">{os.previsaoEntrega}</span></div>
                                                            </motion.div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </section>
    );
};

export default Kanban;

// Configuração de proxy para evitar CORS durante o desenvolvimento
// Adicione o bloco abaixo no arquivo vite.config.ts, dentro do export default defineConfig({ ... })
//
// server: {
//   proxy: {
//     '/api/v1': {
//       target: 'https://sgosistemas.com.br',
//       changeOrigin: true,
//       secure: false,
//     }
//   }
// },
//
// Depois, altere as URLs dos fetchs para começar com /api/v1/ (ex: /api/v1/clientes/)