import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Cliente {
    id: number;
    NOME: string;
    LOGRADOURO: string;
    NUMERO: string;
    BAIRRO: string;
    CIDADE: string;
    CPF: string;
    EMAIL: string;
    TELEFONE: string;
}

const clientesMock: Cliente[] = [
    {
        id: 1,
        NOME: "Vitor Teste",
        LOGRADOURO: "Rua Exemplo",
        NUMERO: "154",
        BAIRRO: "Belvedere",
        CIDADE: "Ribeirão das Neves",
        CPF: "000.000.000-00",
        EMAIL: "vitor@gmail.com",
        TELEFONE: "(00) 00000-0000",
    },
    // ...adicione mais objetos Cliente aqui...
];

const PAGE_SIZE = 5;

const SearchBar: React.FC<{ search: string; setSearch: (value: string) => void }> = ({ search, setSearch }) => (
    <div className="flex items-center gap-4 w-full px-4 pt-4">
        <input
            type="search"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            aria-label="Pesquisar clientes"
        />
        <Link
            to="/cadastro-cliente"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            Cadastrar Cliente
        </Link>
    </div>
);

const Paginator: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            <span className="px-3 py-1 text-gray-700 dark:text-gray-200 font-semibold">
                Página {currentPage} de {totalPages}
            </span>
            <button
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

const Clientes: React.FC = () => {
    const [search, setSearch] = useState("");
    const [clientes] = useState<Cliente[]>(clientesMock);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = clientes.filter((cliente) =>
        cliente.NOME.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    return (
        <section className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col flex-1 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="w-full flex flex-col flex-1">
                <SearchBar search={search} setSearch={setSearch} />
                <div className="flex-1 mt-6 overflow-auto w-full px-4 pb-4">
                    <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-gray-900 dark:text-white">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                {["Nome", "Logradouro", "Número", "Bairro", "Cidade", "CPF", "Email", "Telefone", "Ação"].map((header) => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-white">
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                                        Nenhum cliente encontrado.
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((cliente) => (
                                    <tr key={cliente.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <td className="px-6 py-4">
                                            <a href={`/cliente/${cliente.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                                {cliente.NOME}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 max-w-[150px] truncate">{cliente.LOGRADOURO}</td>
                                        <td className="px-6 py-4">{cliente.NUMERO}</td>
                                        <td className="px-6 py-4 max-w-[150px] truncate">{cliente.BAIRRO}</td>
                                        <td className="px-6 py-4 max-w-[150px] truncate">{cliente.CIDADE}</td>
                                        <td className="px-6 py-4">{cliente.CPF}</td>
                                        <td className="px-6 py-4 max-w-[150px] truncate">{cliente.EMAIL}</td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            {cliente.TELEFONE}
                                            <a
                                                href={`https://wa.me/55${cliente.TELEFONE.replace(/\D/g, "")}?text=Olá! ${cliente.NOME}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Enviar mensagem para ${cliente.NOME} via WhatsApp`}
                                            >
                                                <img
                                                    width="24"
                                                    height="24"
                                                    src="https://img.icons8.com/color/48/whatsapp--v1.png"
                                                    alt="WhatsApp"
                                                />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`/cadastrar-os/${cliente.id}`} aria-label="Criar ordem de serviço">
                                                <svg
                                                    className="w-6 h-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Paginator
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </section>
    );
};

export default Clientes;