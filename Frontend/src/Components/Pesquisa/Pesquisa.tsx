import React, { useState } from "react";
import { Link } from "react-router-dom";

const mockOS = [
    {
        id: 1,
        servico: "Troca de Lente",
        cliente: "João Silva",
        vendedor: "Maria",
        lentes: "Crizal",
        dataPedido: "2024-06-01",
        status: "A",
        telefone: "(31) 99999-9999",
        previsaoEntrega: "2024-06-10"
    },
    {
        id: 2,
        servico: "Ajuste de Armação",
        cliente: "Ana Souza",
        vendedor: "Carlos",
        lentes: "Transitions",
        dataPedido: "2024-06-03",
        status: "E",
        telefone: "(31) 98888-8888",
        previsaoEntrega: "2024-06-12"
    },
    {
        id: 3,
        servico: "Troca de Haste",
        cliente: "Pedro Lima",
        vendedor: "Fernanda",
        lentes: "Varilux",
        dataPedido: "2024-06-05",
        status: "C",
        telefone: "(31) 97777-7777",
        previsaoEntrega: "2024-06-15"
    },
    {
        id: 4,
        servico: "Limpeza",
        cliente: "Lucas Alves",
        vendedor: "Bruna",
        lentes: "Crizal",
        dataPedido: "2024-06-07",
        status: "L",
        telefone: "(31) 96666-6666",
        previsaoEntrega: "2024-06-17"
    },
    {
        id: 5,
        servico: "Troca de Parafuso",
        cliente: "Mariana Dias",
        vendedor: "João",
        lentes: "Transitions",
        dataPedido: "2024-06-09",
        status: "F",
        telefone: "(31) 95555-5555",
        previsaoEntrega: "2024-06-19"
    },
    {
        id: 6,
        servico: "Ajuste de Plaqueta",
        cliente: "Rafael Costa",
        vendedor: "Maria",
        lentes: "Varilux",
        dataPedido: "2024-06-11",
        status: "J",
        telefone: "(31) 94444-4444",
        previsaoEntrega: "2024-06-21"
    },
    {
        id: 7,
        servico: "Troca de Lente",
        cliente: "Beatriz Ramos",
        vendedor: "Carlos",
        lentes: "Crizal",
        dataPedido: "2024-06-13",
        status: "A",
        telefone: "(31) 93333-3333",
        previsaoEntrega: "2024-06-23"
    },
    {
        id: 8,
        servico: "Ajuste de Armação",
        cliente: "Gabriel Martins",
        vendedor: "Fernanda",
        lentes: "Transitions",
        dataPedido: "2024-06-15",
        status: "E",
        telefone: "(31) 92222-2222",
        previsaoEntrega: "2024-06-25"
    },
    {
        id: 9,
        servico: "Troca de Haste",
        cliente: "Juliana Rocha",
        vendedor: "Bruna",
        lentes: "Varilux",
        dataPedido: "2024-06-17",
        status: "C",
        telefone: "(31) 91111-1111",
        previsaoEntrega: "2024-06-27"
    },
    {
        id: 10,
        servico: "Limpeza",
        cliente: "Felipe Souza",
        vendedor: "João",
        lentes: "Crizal",
        dataPedido: "2024-06-19",
        status: "L",
        telefone: "(31) 90000-0000",
        previsaoEntrega: "2024-06-29"
    },
    {
        id: 11, servico: "Troca de Lente", cliente: "Clara Mendes", vendedor: "Maria", lentes: "Crizal", dataPedido: "2024-06-02", status: "A", telefone: "(31) 90001-0001", previsaoEntrega: "2024-06-11"
    },
    {
        id: 12, servico: "Ajuste de Armação", cliente: "Eduardo Pires", vendedor: "Carlos", lentes: "Transitions", dataPedido: "2024-06-04", status: "E", telefone: "(31) 90002-0002", previsaoEntrega: "2024-06-13"
    },
    {
        id: 13, servico: "Troca de Haste", cliente: "Sofia Castro", vendedor: "Fernanda", lentes: "Varilux", dataPedido: "2024-06-06", status: "C", telefone: "(31) 90003-0003", previsaoEntrega: "2024-06-16"
    },
    {
        id: 14, servico: "Limpeza", cliente: "Bruno Teixeira", vendedor: "Bruna", lentes: "Crizal", dataPedido: "2024-06-08", status: "L", telefone: "(31) 90004-0004", previsaoEntrega: "2024-06-18"
    },
    {
        id: 15, servico: "Troca de Parafuso", cliente: "Patrícia Lopes", vendedor: "João", lentes: "Transitions", dataPedido: "2024-06-10", status: "F", telefone: "(31) 90005-0005", previsaoEntrega: "2024-06-20"
    },
    {
        id: 16, servico: "Ajuste de Plaqueta", cliente: "Vinícius Reis", vendedor: "Maria", lentes: "Varilux", dataPedido: "2024-06-12", status: "J", telefone: "(31) 90006-0006", previsaoEntrega: "2024-06-22"
    },
    {
        id: 17, servico: "Troca de Lente", cliente: "Larissa Gomes", vendedor: "Carlos", lentes: "Crizal", dataPedido: "2024-06-14", status: "A", telefone: "(31) 90007-0007", previsaoEntrega: "2024-06-24"
    },
    {
        id: 18, servico: "Ajuste de Armação", cliente: "Marcelo Dias", vendedor: "Fernanda", lentes: "Transitions", dataPedido: "2024-06-16", status: "E", telefone: "(31) 90008-0008", previsaoEntrega: "2024-06-26"
    },
    {
        id: 19, servico: "Troca de Haste", cliente: "Camila Faria", vendedor: "Bruna", lentes: "Varilux", dataPedido: "2024-06-18", status: "C", telefone: "(31) 90009-0009", previsaoEntrega: "2024-06-28"
    },
    {
        id: 20, servico: "Limpeza", cliente: "Rodrigo Nunes", vendedor: "João", lentes: "Crizal", dataPedido: "2024-06-20", status: "L", telefone: "(31) 90010-0010", previsaoEntrega: "2024-06-30"
    },
    ...Array.from({ length: 40 }, (_, i) => {
        const id = 21 + i;
        const servicos = ["Troca de Lente", "Ajuste de Armação", "Troca de Haste", "Limpeza", "Troca de Parafuso", "Ajuste de Plaqueta"];
        const clientes = ["André Lima", "Paula Souza", "Tiago Rocha", "Isabela Martins", "Renato Alves", "Juliana Dias", "Lucas Pereira", "Amanda Costa", "Fábio Silva", "Gabriela Ramos"];
        const vendedores = ["Maria", "Carlos", "Fernanda", "Bruna", "João"];
        const lentes = ["Crizal", "Transitions", "Varilux"];
        const statusList = ["A", "E", "C", "L", "F", "J"];
        const cliente = clientes[i % clientes.length];
        const vendedor = vendedores[i % vendedores.length];
        const lente = lentes[i % lentes.length];
        const servico = servicos[i % servicos.length];
        const status = statusList[i % statusList.length];
        const dia = (i % 28) + 1;
        const dataPedido = `2024-06-${dia.toString().padStart(2, '0')}`;
        const previsaoEntrega = `2024-07-${(dia + 7).toString().padStart(2, '0')}`;
        const telefone = `(31) 9${(1000 + i).toString().padStart(4, '0')}-${(1000 + i).toString().padStart(4, '0')}`;
        return {
            id,
            servico,
            cliente,
            vendedor,
            lentes: lente,
            dataPedido,
            status,
            telefone,
            previsaoEntrega
        };
    })
];

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

const Pesquisa: React.FC = () => {
    const [searchCliente, setSearchCliente] = useState("");
    const [searchOS, setSearchOS] = useState("");
    const [status, setStatus] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

    // Filtro simples mock
    const filtered = mockOS.filter(os =>
        (searchCliente === "" || os.cliente.toLowerCase().includes(searchCliente.toLowerCase())) &&
        (searchOS === "" || os.id.toString().includes(searchOS)) &&
        (status === "" || os.status === status) &&
        (dataInicio === "" || os.dataPedido >= dataInicio) &&
        (dataFim === "" || os.dataPedido <= dataFim)
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchCliente, searchOS, status, dataInicio, dataFim, pageSize]);

    return (
        <section className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 transition-colors py-6">
            {/* Filtros e conteúdo */}
            <div className="w-full flex flex-col flex-1">
                <div className="flex flex-col md:flex-row md:items-end gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Cliente</label>
                        <input
                            type="search"
                            placeholder="Cliente"
                            value={searchCliente}
                            onChange={e => setSearchCliente(e.target.value)}
                            className="form-input px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">OS</label>
                        <input
                            type="search"
                            placeholder="OS"
                            value={searchOS}
                            onChange={e => setSearchOS(e.target.value)}
                            className="form-input px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="form-select px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Data Início</label>
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={e => setDataInicio(e.target.value)}
                            className="form-input px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Data Fim</label>
                        <input
                            type="date"
                            value={dataFim}
                            onChange={e => setDataFim(e.target.value)}
                            className="form-input px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={e => e.preventDefault()}
                        className="h-10 mt-6 px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Aplicar
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {/* Cards para mobile */}
                    <div className="md:hidden">
                        {paginated.map(os => (
                            <div key={os.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 text-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-blue-700 dark:text-blue-300">OS #{os.id}</span>
                                    <span>{statusLabel(os.status)}</span>
                                </div>
                                <div className="mb-1"><span className="font-semibold">Serviço:</span> {os.servico}</div>
                                <div className="mb-1"><span className="font-semibold">Cliente:</span> {os.cliente}</div>
                                <div className="mb-1"><span className="font-semibold">Vendedor:</span> {os.vendedor}</div>
                                <div className="mb-1"><span className="font-semibold">Lentes:</span> {os.lentes}</div>
                                <div className="mb-1"><span className="font-semibold">Data Pedido:</span> {os.dataPedido}</div>
                                <div className="mb-1 flex items-center gap-2"><span className="font-semibold">Contato:</span> {os.telefone}
                                    <a
                                        href={`https://wa.me/55${os.telefone.replace(/\D/g, "")}?text=Olá! ${os.cliente}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            width="20"
                                            height="20"
                                            src="https://img.icons8.com/color/48/whatsapp--v1.png"
                                            alt="WhatsApp"
                                        />
                                    </a>
                                </div>
                                <div className="mb-1"><span className="font-semibold">Previsão Entrega:</span> {os.previsaoEntrega}</div>
                                <div className="mt-2">
                                    <Link
                                        to={`/cadastro-os?id=${os.id}`}
                                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                    >
                                        Visualizar
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {paginated.length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow">
                                Nenhuma O.S encontrada.
                            </div>
                        )}
                    </div>
                    {/* Tabela tradicional para desktop */}
                    <div className="hidden md:block">
                        <table className="min-w-full w-full text-sm text-left text-gray-900 dark:text-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">SERVIÇO</th>
                                    <th className="px-4 py-2">CLIENTE</th>
                                    <th className="px-4 py-2">VENDEDOR</th>
                                    <th className="px-4 py-2">LENTES</th>
                                    <th className="px-4 py-2">DATA PEDIDO</th>
                                    <th className="px-4 py-2">STATUS</th>
                                    <th className="px-4 py-2">N° Contato</th>
                                    <th className="px-4 py-2">PREVISÃO ENTREGA</th>
                                    <th className="px-4 py-2">AÇÃO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(os => (
                                    <tr key={os.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition block md:table-row">
                                        <td className="px-4 py-2 block md:table-cell before:content-['ID:'] md:before:content-none">{os.id}</td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Serviço:'] md:before:content-none">{os.servico}</td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Cliente:'] md:before:content-none">{os.cliente}</td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Vendedor:'] md:before:content-none">{os.vendedor}</td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Lentes:'] md:before:content-none">{os.lentes}</td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Data Pedido:'] md:before:content-none">{os.dataPedido}</td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Status:'] md:before:content-none">{statusLabel(os.status)}</td>
                                        <td className="px-4 py-2 flex items-center gap-2 block md:table-cell before:content-['N° Contato:'] md:before:content-none">
                                            {os.telefone}
                                            <a
                                                href={`https://wa.me/55${os.telefone.replace(/\D/g, "")}?text=Olá! ${os.cliente}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    width="24"
                                                    height="24"
                                                    src="https://img.icons8.com/color/48/whatsapp--v1.png"
                                                    alt="WhatsApp"
                                                />
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Previsão Entrega:'] md:before:content-none">{os.previsaoEntrega}</td>
                                        <td className="px-4 py-2 block md:table-cell before:content-['Ação:'] md:before:content-none">
                                            <Link
                                                to={`/cadastro-os?id=${os.id}`}
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                Visualizar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {paginated.length === 0 && (
                                    <tr>
                                        <td colSpan={10} className="px-4 py-8 text-center text-gray-500 dark:text-gray-300">
                                            Nenhuma O.S encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Paginação moderna centralizada */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 px-2 w-full">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Itens por página:</span>
                        <select
                            value={pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            {PAGE_SIZE_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50 shadow-sm transition"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Página anterior"
                        >
                            &lt;
                        </button>
                        <span className="px-3 py-1 text-gray-700 dark:text-gray-200 font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50 shadow-sm transition"
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