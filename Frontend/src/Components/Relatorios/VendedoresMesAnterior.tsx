import React from "react";

// Mock de vendedores e vendas para simulação local
const vendedoresMock = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Souza" },
    { id: 3, nome: "Carlos Lima" },
    { id: 4, nome: "Fernanda Alves" },
    { id: 5, nome: "Paulo Oliveira" },
    { id: 6, nome: "Juliana Martins" },
    { id: 7, nome: "Ricardo Santos" },
    { id: 8, nome: "Patrícia Gomes" },
    { id: 9, nome: "Lucas Pereira" },
    { id: 10, nome: "Amanda Costa" },
];

// Geração de 50 vendas mockadas
const nomesClientes = [
    "Ana Paula", "Carlos Mendes", "Bruna Lima", "Felipe Souza", "Mariana Silva", "Lucas Rocha", "Patrícia Alves", "Rafael Costa", "Juliana Dias", "Fernando Pinto"
];
const servicos = [
    "Óculos de Grau", "Lente de Contato", "Armação", "Óculos de Sol", "Exame de Vista", "Ajuste de Armação"
];
const tipos = ["Presencial", "Internet"];
const statusList = ["Venda", "Orçamento", "Cancelado"];

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const vendasMock = Array.from({ length: 50 }, (_, i) => {
    const vendedor = vendedoresMock[getRandomInt(0, vendedoresMock.length - 1)].nome;
    const data = `2025-06-${getRandomInt(1, 28).toString().padStart(2, '0')}`;
    const servico = servicos[getRandomInt(0, servicos.length - 1)];
    const cliente = nomesClientes[getRandomInt(0, nomesClientes.length - 1)];
    const animal = "-";
    const valorBruto = getRandomInt(100, 1000);
    const desconto = getRandomInt(0, 100);
    const valorFinal = valorBruto - desconto;
    const tipo = tipos[getRandomInt(0, tipos.length - 1)];
    const status = statusList[getRandomInt(0, statusList.length - 1)];
    return {
        id: i + 1,
        vendedor,
        data,
        servico,
        cliente,
        animal,
        valorBruto,
        desconto,
        valorFinal,
        tipo,
        status,
    };
});

// Tipo para venda mockada
interface Venda {
    id: number;
    vendedor: string;
    data: string;
    servico: string;
    cliente: string;
    animal: string;
    valorBruto: number;
    desconto: number;
    valorFinal: number;
    tipo: string;
    status: string;
}

// Componente Modal simples
function ModalDetalheVenda({ venda, onClose }: { venda: Venda | null, onClose: () => void }) {
    if (!venda) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full mx-2 p-6 relative animate-fade-in">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-blue-700 dark:hover:text-blue-300 text-xl font-bold focus:outline-none"
                    onClick={onClose}
                    aria-label="Fechar detalhes da venda"
                >×</button>
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">Detalhes da Venda</h2>
                <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">ID:</span> {venda.id}</div>
                    <div><span className="font-semibold">Vendedor:</span> {venda.vendedor}</div>
                    <div><span className="font-semibold">Data:</span> {new Date(venda.data).toLocaleDateString()}</div>
                    <div><span className="font-semibold">Serviço/Produto:</span> {venda.servico}</div>
                    <div><span className="font-semibold">Cliente:</span> {venda.cliente}</div>
                    <div><span className="font-semibold">Valor Bruto:</span> R$ {venda.valorBruto.toFixed(2)}</div>
                    <div><span className="font-semibold">Desconto:</span> R$ {venda.desconto.toFixed(2)}</div>
                    <div><span className="font-semibold">Valor Final:</span> R$ {venda.valorFinal.toFixed(2)}</div>
                    <div><span className="font-semibold">Tipo de Venda:</span> {venda.tipo}</div>
                    <div><span className="font-semibold">Status:</span> {venda.status}</div>
                </div>
            </div>
        </div>
    );
}

const VendedoresMesAnterior: React.FC = () => {
    const [dataInicio, setDataInicio] = React.useState("");
    const [dataFim, setDataFim] = React.useState("");
    // Por padrão, todos selecionados
    const [vendedoresSelecionados, setVendedoresSelecionados] = React.useState<number[]>(vendedoresMock.map(v => v.id));
    const [busca, setBusca] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [vendaSelecionada, setVendaSelecionada] = React.useState<Venda | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Fecha dropdown ao clicar fora
    React.useEffect(() => {
        if (!dropdownOpen) return;
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [dropdownOpen]);

    // Filtro local
    const vendasFiltradas = vendasMock
        .filter((venda) => {
            const dataOk = (!dataInicio || venda.data >= dataInicio) && (!dataFim || venda.data <= dataFim);
            // Corrige para evitar uso inseguro de !
            const vendedorObj = vendedoresMock.find(v => v.nome === venda.vendedor);
            const vendedorOk = vendedoresSelecionados.length === 0 || (vendedorObj && vendedoresSelecionados.includes(vendedorObj.id));
            const buscaOk =
                busca.trim() === "" ||
                venda.cliente.toLowerCase().includes(busca.toLowerCase()) ||
                venda.servico.toLowerCase().includes(busca.toLowerCase());
            return dataOk && vendedorOk && buscaOk;
        })
        .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

    // Handler para checkbox
    const handleVendedorCheck = (id: number) => {
        setVendedoresSelecionados((prev) =>
            prev.includes(id)
                ? prev.filter((vid) => vid !== id)
                : [...prev, id]
        );
    };

    // Handler para selecionar todos
    const allSelected = vendedoresSelecionados.length === vendedoresMock.length;
    const handleSelectAll = () => {
        if (allSelected) {
            setVendedoresSelecionados([]);
        } else {
            setVendedoresSelecionados(vendedoresMock.map(v => v.id));
        }
    };

    return (
        <section className="w-full min-w-0 min-h-[400px] flex flex-col gap-6 bg-white dark:bg-[#181a20] transition-colors box-border">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-extrabold text-center text-blue-800 dark:text-white mb-4 md:mb-6 tracking-tight pt-6 md:pt-8">Consultar Período</h1>
            {/* Filtros */}
            <form className="flex flex-col md:flex-row gap-3 md:gap-6 items-stretch md:items-center justify-center mb-2 px-1 xs:px-2 sm:px-4 md:px-8 w-full max-w-full" aria-label="Filtros de relatório de vendas">
                <div className="flex flex-col gap-1 w-full max-w-xs">
                    <label htmlFor="data-inicio" className="text-xs xs:text-sm font-semibold text-blue-900 dark:text-blue-100">Data Início</label>
                    <input id="data-inicio" type="date" className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2 xs:px-3 py-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1 w-full max-w-xs">
                    <label htmlFor="data-fim" className="text-xs xs:text-sm font-semibold text-blue-900 dark:text-blue-100">Data Fim</label>
                    <input id="data-fim" type="date" className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2 xs:px-3 py-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full" value={dataFim} onChange={e => setDataFim(e.target.value)} />
                </div>
                {/* Filtro de vendedores como dropdown */}
                <div className="flex flex-col gap-1 w-full min-w-[140px] max-w-xs relative" ref={dropdownRef}>
                    <label className="text-xs xs:text-sm font-semibold text-blue-900 dark:text-blue-100">Vendedores</label>
                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2 xs:px-3 py-2 text-xs xs:text-sm flex items-center justify-between w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                        onClick={() => setDropdownOpen((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                    >
                        <span className="truncate text-xs xs:text-sm">
                            {vendedoresSelecionados.length === 0
                                ? "Nenhum selecionado"
                                : vendedoresSelecionados.length === vendedoresMock.length
                                    ? "Todos"
                                    : vendedoresMock.filter(v => vendedoresSelecionados.includes(v.id)).map(v => v.nome).join(", ")}
                        </span>
                        <svg className={`ml-2 w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 z-50 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent animate-fade-in">
                            <div className="flex items-center px-2 py-1">
                                <input
                                    type="checkbox"
                                    id="select-all-vendedores"
                                    checked={allSelected}
                                    onChange={handleSelectAll}
                                    className="accent-blue-600 mr-2"
                                    aria-label="Selecionar todos os vendedores"
                                />
                                <label htmlFor="select-all-vendedores" className="text-xs xs:text-sm select-none cursor-pointer">Todos</label>
                            </div>
                            {vendedoresMock.map((v) => (
                                <div key={v.id} className="flex items-center px-2 py-1">
                                    <input
                                        type="checkbox"
                                        id={`vendedor-${v.id}`}
                                        checked={vendedoresSelecionados.includes(v.id)}
                                        onChange={() => handleVendedorCheck(v.id)}
                                        className="accent-blue-600 mr-2"
                                        aria-label={`Selecionar vendedor ${v.nome}`}
                                    />
                                    <label htmlFor={`vendedor-${v.id}`} className="text-xs xs:text-sm select-none cursor-pointer">{v.nome}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-1 w-full min-w-[140px] max-w-xs">
                    <label htmlFor="busca" className="text-xs xs:text-sm font-semibold text-blue-900 dark:text-blue-100">Pesquisar Cliente/Serviço</label>
                    <input id="busca" type="text" className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2 xs:px-3 py-2 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full" placeholder="Nome do cliente ou serviço" value={busca} onChange={e => setBusca(e.target.value)} aria-label="Pesquisar por cliente ou serviço" tabIndex={0} />
                </div>
            </form>
            {/* Tabela */}
            <div className="flex-1 min-h-0 min-w-0 flex flex-col pb-6 md:pb-8 px-0 xs:px-1 sm:px-2 md:px-4 lg:px-8">
                {/* Aviso de arraste no mobile */}
                <div className="block sm:hidden text-center text-xs text-gray-500 dark:text-gray-400 mb-1 select-none">Arraste a tabela para o lado →</div>
                <div className="flex-1 min-h-0 min-w-0 flex flex-col overflow-x-auto">
                    <div className="relative max-h-[70vh] md:max-h-[900px] h-full overflow-y-auto custom-scrollbar-hide min-w-0">
                        <table className="w-full min-w-[520px] xs:min-w-[600px] sm:min-w-[700px] text-[11px] xs:text-xs sm:text-sm md:text-base table-fixed">
                            <thead className="sticky top-0 z-20 bg-white dark:bg-gray-900">
                                <tr className="bg-blue-100 dark:bg-blue-950">
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap">ID</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap">Vendedor</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap">Data da Venda</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap">Serviço/Produto</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap">Cliente</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap hidden xs:table-cell">Valor Bruto</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap hidden sm:table-cell">Desconto</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap hidden xs:table-cell">Valor Final</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap hidden md:table-cell">Tipo de Venda</th>
                                    <th className="px-1 xs:px-2 sm:px-3 py-2 font-bold text-left text-blue-900 dark:text-blue-100 whitespace-nowrap hidden md:table-cell">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendasFiltradas.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="text-center py-8 text-gray-500 dark:text-gray-300">Nenhum dado encontrado</td>
                                    </tr>
                                ) : (
                                    vendasFiltradas.map((venda) => (
                                        <tr
                                            key={venda.id}
                                            className="hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors cursor-pointer"
                                            tabIndex={0}
                                            onClick={() => setVendaSelecionada(venda)}
                                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setVendaSelecionada(venda); }}
                                            aria-label={`Ver detalhes da venda ${venda.id}`}
                                        >
                                            <td className="px-1 xs:px-3 py-2">{venda.id}</td>
                                            <td className="px-1 xs:px-3 py-2">{venda.vendedor}</td>
                                            <td className="px-1 xs:px-3 py-2">{new Date(venda.data).toLocaleDateString()}</td>
                                            <td className="px-1 xs:px-3 py-2">{venda.servico}</td>
                                            <td className="px-1 xs:px-3 py-2">{venda.cliente}</td>
                                            <td className="px-1 xs:px-3 py-2 hidden xs:table-cell">R$ {venda.valorBruto.toFixed(2)}</td>
                                            <td className="px-1 xs:px-3 py-2 hidden sm:table-cell">R$ {venda.desconto.toFixed(2)}</td>
                                            <td className="px-1 xs:px-3 py-2 hidden xs:table-cell">R$ {venda.valorFinal.toFixed(2)}</td>
                                            <td className="px-1 xs:px-3 py-2 hidden md:table-cell">{venda.tipo}</td>
                                            <td className="px-1 xs:px-3 py-2 hidden md:table-cell">{venda.status}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {/* Modal de detalhes da venda */}
                        <ModalDetalheVenda venda={vendaSelecionada} onClose={() => setVendaSelecionada(null)} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VendedoresMesAnterior;
// Nenhum botão de UI Demo encontrado para remoção.
