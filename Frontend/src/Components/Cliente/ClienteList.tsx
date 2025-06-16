import React, { useState } from "react";

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
];

const Breadcrumb: React.FC = () => (
    <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex space-x-2 text-sm text-gray-600">
            <li>
                <a href="/" className="hover:text-blue-600">Página Principal</a>
            </li>
            <li className="before:content-['/'] before:mx-2">Clientes</li>
        </ol>
    </nav>
);

const SearchBar: React.FC<{ search: string; setSearch: (value: string) => void }> = ({ search, setSearch }) => (
    <div className="flex items-center gap-4">
        <input
            type="search"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Pesquisar clientes"
        />
        <a
            href="/cadastro-cliente"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            Cadastrar Cliente
        </a>
    </div>
);

const Clientes: React.FC = () => {
    const [search, setSearch] = useState("");
    const [clientes] = useState<Cliente[]>(clientesMock);

    const filtered = clientes.filter((cliente) =>
        cliente.NOME.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="max-w-7xl mx-auto p-6">
            <Breadcrumb />
            <SearchBar search={search} setSearch={setSearch} />
            <div className="mt-6 overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {["Nome", "Logradouro", "Número", "Bairro", "Cidade", "CPF", "Email", "Telefone", "Ação"].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                                    Nenhum cliente encontrado.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((cliente) => (
                                <tr key={cliente.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <a href={`/cliente/${cliente.id}`} className="text-blue-600 hover:underline">
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
                                                className="w-6 h-6 text-blue-600 hover:text-blue-800"
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
            <div className="mt-4 text-center text-sm text-gray-600">
                Página 1 de 1
            </div>
        </section>
    );
};

export default Clientes;