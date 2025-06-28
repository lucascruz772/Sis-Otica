import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const statusLabel = (status: string) => {
    switch (status) {
        case "A": return <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">SOLICITADO</span>;
        case "E": return <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">ENTREGUE</span>;
        case "C": return <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">CANCELADO</span>;
        case "L": return <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">LABORATÓRIO</span>;
        case "F": return <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs">FINALIZADO</span>;
        case "J": return <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs">LOJA</span>;
        default: return null;
    }
};

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50, 100];

interface Ordem {
    id: number;
    servico: string;
    cliente: string;
    vendedor: string;
    lentes: string;
    dataPedido: string;
    status: string;
    telefone: string;
    previsaoEntrega: string;
}

const Pesquisa: React.FC = () => {
    const [ordens, setOrdens] = useState<Ordem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Mapas para nomes
    const [clientesMap, setClientesMap] = useState<Record<number, string>>({});
    const [vendedoresMap, setVendedoresMap] = useState<Record<number, string>>({});
    const [servicosMap, setServicosMap] = useState<Record<number, string>>({});

    // Filtros
    const [searchCliente, setSearchCliente] = useState("");
    const [searchOS, setSearchOS] = useState("");
    const [status, setStatus] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

    // Buscar dados da API
    useEffect(() => {
        setLoading(true);
        setError(null);
        Promise.all([
            axios.get("/api/v1/ordens/"),
            axios.get("/api/v1/clientes/"),
            axios.get("/api/v1/usuarios/"),
            axios.get("/api/v1/servicos/")
        ])
            .then(([ordensRes, clientesRes, usuariosRes, servicosRes]) => {
                // Mapear clientes
                interface Cliente {
                    id: number;
                    NOME?: string;
                    nome?: string;
                    Nome?: string;
                }
                const clientesArr = Array.isArray(clientesRes.data.results) ? clientesRes.data.results as Cliente[] : [];
                const clientesMap: Record<number, string> = {};
                clientesArr.forEach((c: Cliente) => { clientesMap[c.id] = c.NOME ?? c.nome ?? c.Nome ?? ""; });
                setClientesMap(clientesMap);

                // Mapear vendedores (usuarios)
                interface Usuario {
                    id: number;
                    username?: string;
                    first_name?: string;
                    FUNCAO?: string;
                }
                const usuariosArr = Array.isArray(usuariosRes.data.results) ? usuariosRes.data.results as Usuario[] : [];
                console.log('USUARIOS API:', usuariosArr); // <-- Adicionado para depuração
                const vendedoresMap: Record<number, string> = {};
                usuariosArr.forEach((u: Usuario) => { vendedoresMap[Number(u.id)] = u.first_name ?? u.username ?? ""; });
                setVendedoresMap(vendedoresMap);

                // Mapear serviços
                interface Servico {
                    id: number;
                    NOME?: string;
                    nome?: string;
                    Nome?: string;
                }
                const servicosArr = Array.isArray(servicosRes.data.results) ? servicosRes.data.results as Servico[] : [];
                const servicosMap: Record<number, string> = {};
                servicosArr.forEach((s: Servico) => { servicosMap[s.id] = s.NOME ?? s.nome ?? s.Nome ?? ""; });
                setServicosMap(servicosMap);

                // Mapear ordens
                const results = Array.isArray(ordensRes.data.results) ? ordensRes.data.results : [];
                const mapped = results.map((item: Record<string, unknown>) => ({
                    id: item.id as number,
                    servico: (item.SERVICO ?? "") as string | number,
                    cliente: (item.CLIENTE ?? "") as string | number,
                    vendedor: (item.VENDEDOR ?? "") as string | number,
                    lentes: (item.LENTES ?? "") as string,
                    dataPedido: (item.DATA_SOLICITACAO ?? "") as string,
                    status: (item.STATUS ?? "") as string,
                    telefone: (item.DNP ?? "") as string, // ajuste conforme o campo correto de telefone
                    previsaoEntrega: (item.PREVISAO_ENTREGA ?? "") as string,
                }));
                setOrdens(mapped);
                setLoading(false);
            })
            .catch(() => {
                setError("Erro ao buscar dados da API");
                setLoading(false);
            });
    }, []);

    // Filtro simples mock adaptado para ordens da API
    const filtered = ordens.filter(os =>
        (searchCliente === "" || (clientesMap[Number(os.cliente)] && clientesMap[Number(os.cliente)].toLowerCase().includes(searchCliente.toLowerCase()))) &&
        (searchOS === "" || os.id?.toString().includes(searchOS)) &&
        (status === "" || os.status === status) &&
        (dataInicio === "" || os.dataPedido >= dataInicio) &&
        (dataFim === "" || os.dataPedido <= dataFim)
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchCliente, searchOS, status, dataInicio, dataFim, pageSize]);

    if (loading) return <div className="p-8 text-center">Carregando...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <section className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 transition-colors py-3 sm:py-6">
            {/* Filtros e conteúdo */}
            <div className="w-full flex flex-col flex-1">
                <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
                    <div className="flex flex-col gap-1 sm:gap-2 w-full md:w-auto">
                        <label className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200">Cliente</label>
                        <input
                            type="search"
                            placeholder="Cliente"
                            value={searchCliente}
                            onChange={e => setSearchCliente(e.target.value)}
                            className="form-input px-2 py-1 sm:px-3 sm:py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2 w-full md:w-auto">
                        <label className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200">OS</label>
                        <input
                            type="search"
                            placeholder="OS"
                            value={searchOS}
                            onChange={e => setSearchOS(e.target.value)}
                            className="form-input px-2 py-1 sm:px-3 sm:py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2 w-full md:w-auto">
                        <label className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200">Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="form-select px-2 py-1 sm:px-3 sm:py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs sm:text-sm"
                        >
                            <option value="">Status</option>
                            <option value="A">SOLICITADO</option>
                            <option value="E">ENTREGUE</option>
                            <option value="C">CANCELADO</option>
                            <option value="L">LABORATÓRIO</option>
                            <option value="F">FINALIZADO</option>
                            <option value="J">LOJA</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2 w-full md:w-auto">
                        <label className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200">Data Início</label>
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={e => setDataInicio(e.target.value)}
                            className="form-input px-2 py-1 sm:px-3 sm:py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs sm:text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2 w-full md:w-auto">
                        <label className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200">Data Fim</label>
                        <input
                            type="date"
                            value={dataFim}
                            onChange={e => setDataFim(e.target.value)}
                            className="form-input px-2 py-1 sm:px-3 sm:py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs sm:text-sm"
                        />
                    </div>
                    <button
                        onClick={e => e.preventDefault()}
                        className="h-8 sm:h-10 mt-2 sm:mt-6 px-4 sm:px-6 py-1 sm:py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-xs sm:text-sm"
                    >
                        Aplicar
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {/* Cards para mobile */}
                    <div className="md:hidden">
                        {paginated.map(os => (
                            <div key={os.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 mb-3 text-xs sm:text-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-blue-700 dark:text-blue-300">OS #{os.id}</span>
                                    <span>{statusLabel(os.status)}</span>
                                </div>
                                <div className="mb-0.5"><span className="font-semibold">Serviço:</span> {servicosMap[Number(os.servico)] || os.servico}</div>
                                <div className="mb-0.5"><span className="font-semibold">Cliente:</span> {clientesMap[Number(os.cliente)] || os.cliente}</div>
                                <div className="mb-0.5"><span className="font-semibold">Vendedor:</span> {vendedoresMap[Number(os.vendedor)] || os.vendedor}</div>
                                <div className="mb-0.5"><span className="font-semibold">Lentes:</span> {os.lentes}</div>
                                <div className="mb-0.5"><span className="font-semibold">Data Pedido:</span> {os.dataPedido}</div>
                                <div className="mb-0.5 flex items-center gap-1"><span className="font-semibold">Contato:</span> {os.telefone}
                                    <a
                                        href={`https://wa.me/55${os.telefone.replace(/\D/g, "")}?text=Olá! ${clientesMap[Number(os.cliente)] || os.cliente}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            width="18"
                                            height="18"
                                            src="https://img.icons8.com/color/48/whatsapp--v1.png"
                                            alt="WhatsApp"
                                        />
                                    </a>
                                </div>
                                <div className="mb-0.5"><span className="font-semibold">Previsão Entrega:</span> {os.previsaoEntrega}</div>
                                <div className="mt-1">
                                    <Link
                                        to={`/cadastro-os?id=${os.id}`}
                                        className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
                                    >
                                        Visualizar
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {paginated.length === 0 && (
                            <div className="px-2 py-6 text-center text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow text-xs">
                                Nenhuma O.S encontrada.
                            </div>
                        )}
                    </div>
                    {/* Tabela tradicional para desktop */}
                    <div className="hidden md:block">
                        <table className="min-w-full w-full text-xs sm:text-sm text-left text-gray-900 dark:text-white">
                            <thead>
                                <tr>
                                    <th className="px-2 sm:px-4 py-2">ID</th>
                                    <th className="px-2 sm:px-4 py-2">SERVIÇO</th>
                                    <th className="px-2 sm:px-4 py-2">CLIENTE</th>
                                    <th className="px-2 sm:px-4 py-2">VENDEDOR</th>
                                    <th className="px-2 sm:px-4 py-2">LENTES</th>
                                    <th className="px-2 sm:px-4 py-2">DATA PEDIDO</th>
                                    <th className="px-2 sm:px-4 py-2">STATUS</th>
                                    <th className="px-2 sm:px-4 py-2">N° Contato</th>
                                    <th className="px-2 sm:px-4 py-2">PREVISÃO ENTREGA</th>
                                    <th className="px-2 sm:px-4 py-2">AÇÃO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(os => (
                                    <tr key={os.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition block md:table-row">
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['ID:'] md:before:content-none">{os.id}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Serviço:'] md:before:content-none">{servicosMap[Number(os.servico)] || os.servico}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Cliente:'] md:before:content-none">{clientesMap[Number(os.cliente)] || os.cliente}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Vendedor:'] md:before:content-none">{vendedoresMap[Number(os.vendedor)] || os.vendedor}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Lentes:'] md:before:content-none">{os.lentes}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Data Pedido:'] md:before:content-none">{os.dataPedido}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Status:'] md:before:content-none">{statusLabel(os.status)}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['N° Contato:'] md:before:content-none">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                {os.telefone}
                                                <a
                                                    href={`https://wa.me/55${os.telefone.replace(/\D/g, "")}?text=Olá! ${clientesMap[Number(os.cliente)] || os.cliente}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        width="18"
                                                        height="18"
                                                        src="https://img.icons8.com/color/48/whatsapp--v1.png"
                                                        alt="WhatsApp"
                                                    />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Previsão Entrega:'] md:before:content-none">{os.previsaoEntrega}</td>
                                        <td className="px-2 sm:px-4 py-2 block md:table-cell before:content-['Ação:'] md:before:content-none">
                                            <Link
                                                to={`/cadastro-os?id=${os.id}`}
                                                className="text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm"
                                            >
                                                Visualizar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {paginated.length === 0 && (
                                    <tr>
                                        <td colSpan={10} className="px-2 sm:px-4 py-8 text-center text-gray-500 dark:text-gray-300 text-xs sm:text-sm">
                                            Nenhuma O.S encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Paginação moderna centralizada */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-6 px-1 sm:px-2 w-full">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 font-medium">Itens por página:</span>
                        <select
                            value={pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2 sm:px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-xs sm:text-sm"
                        >
                            {PAGE_SIZE_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            className="px-2 sm:px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50 shadow-sm transition text-xs sm:text-sm"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Página anterior"
                        >
                            &lt;
                        </button>
                        <span className="px-2 sm:px-3 py-1 text-gray-700 dark:text-gray-200 font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-xs sm:text-sm">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            className="px-2 sm:px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50 shadow-sm transition text-xs sm:text-sm"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Próxima página"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pesquisa;