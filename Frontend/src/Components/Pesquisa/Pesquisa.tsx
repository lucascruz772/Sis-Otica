import React, { useState } from "react";

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
    // ...adicione mais objetos conforme necessário
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

const Pesquisa: React.FC = () => {
    const [searchCliente, setSearchCliente] = useState("");
    const [searchOS, setSearchOS] = useState("");
    const [status, setStatus] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    // Filtro simples mock
    const filtered = mockOS.filter(os =>
        (searchCliente === "" || os.cliente.toLowerCase().includes(searchCliente.toLowerCase())) &&
        (searchOS === "" || os.id.toString().includes(searchOS)) &&
        (status === "" || os.status === status) &&
        (dataInicio === "" || os.dataPedido >= dataInicio) &&
        (dataFim === "" || os.dataPedido <= dataFim)
    );

    return (
        <section className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 transition-colors px-4 py-6">
            <nav className="mb-4">
                <ol className="flex text-sm text-gray-500 dark:text-gray-300 space-x-2">
                    <li><a href="/" className="hover:underline text-blue-600 dark:text-blue-400">Pagina Principal</a></li>
                    <li>/</li>
                    <li className="text-gray-700 dark:text-white">O.S</li>
                </ol>
            </nav>
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
            <div className="overflow-auto rounded-lg shadow bg-white dark:bg-gray-800">
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
                        {filtered.map(os => (
                            <tr key={os.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                <td className="px-4 py-2">{os.id}</td>
                                <td className="px-4 py-2">{os.servico}</td>
                                <td className="px-4 py-2">{os.cliente}</td>
                                <td className="px-4 py-2">{os.vendedor}</td>
                                <td className="px-4 py-2">{os.lentes}</td>
                                <td className="px-4 py-2">{os.dataPedido}</td>
                                <td className="px-4 py-2">{statusLabel(os.status)}</td>
                                <td className="px-4 py-2 flex items-center gap-2">
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
                                <td className="px-4 py-2">{os.previsaoEntrega}</td>
                                <td className="px-4 py-2">
                                    <a
                                        href={`/os/${os.id}`}
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Visualizar
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={10} className="px-4 py-8 text-center text-gray-500 dark:text-gray-300">
                                    Nenhuma O.S encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Paginação mock */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition" disabled>
                    &lt;
                </button>
                <span className="px-3 py-1 text-gray-700 dark:text-gray-200 font-semibold">
                    1 de 1
                </span>
                <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition" disabled>
                    &gt;
                </button>
            </div>
        </section>
    );
};

export default Pesquisa;