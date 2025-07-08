import React, { useState, useEffect } from "react";
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
    ...Array.from({ length: 50 }, (_, i) => {
        const nomes = ["Ana Souza", "Carlos Silva", "Maria Oliveira", "João Santos", "Paula Lima", "Rafael Costa", "Juliana Dias", "Lucas Pereira", "Amanda Costa", "Fábio Silva", "Gabriela Ramos", "Bruno Teixeira", "Larissa Gomes", "Eduardo Pires", "Sofia Castro", "Pedro Lima", "Isabela Martins", "Renato Alves", "Tiago Rocha", "Camila Faria"];
        const bairros = ["Centro", "Savassi", "Funcionários", "Santa Efigênia", "Sion", "Serra", "Anchieta", "Carmo", "Luxemburgo", "Prado"];
        const cidades = ["Belo Horizonte", "Contagem", "Betim", "Nova Lima", "Ribeirão das Neves"];
        const nome = nomes[i % nomes.length];
        const bairro = bairros[i % bairros.length];
        const cidade = cidades[i % cidades.length];
        return {
            id: i + 2,
            NOME: nome,
            LOGRADOURO: `Rua ${String.fromCharCode(65 + (i % 26))} ${i + 10}`,
            NUMERO: `${100 + i}`,
            BAIRRO: bairro,
            CIDADE: cidade,
            CPF: `${(100 + i).toString().padStart(3, '0')}.${(200 + i).toString().padStart(3, '0')}.${(300 + i).toString().padStart(3, '0')}-0${i % 10}`,
            EMAIL: `${nome.toLowerCase().replace(/ /g, ".")}@exemplo.com`,
            TELEFONE: `(31) 9${(9000 + i).toString().padStart(4, '0')}-${(1000 + i).toString().padStart(4, '0')}`,
        };
    })
];

const SearchBar: React.FC<{ search: string; setSearch: (value: string) => void }> = ({ search, setSearch }) => (
    <div className="flex items-center gap-2 w-full pt-4 sm:gap-4"> {/* gap menor no mobile */}
        <input
            type="search"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-32 sm:w-64 px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs sm:text-base"
            aria-label="Pesquisar clientes"
        />
        <Link
            to="/cadastro-cliente"
            className="px-3 sm:px-6 py-1.5 sm:py-2 min-w-[100px] sm:min-w-[180px] text-xs sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
        >
            Cadastrar Cliente
        </Link>
    </div>
);

const Clientes: React.FC = () => {
    const [search, setSearch] = useState("");
    const [clientes] = useState<Cliente[]>(clientesMock);
    const [visibleCount, setVisibleCount] = useState(20); // Começa mostrando 20
    const [isFetching, setIsFetching] = useState(false);

    const filtered = clientes.filter((cliente) =>
        cliente.NOME.toLowerCase().includes(search.toLowerCase())
    );

    // Scroll infinito: carrega mais ao chegar no fim
    useEffect(() => {
        function handleScroll() {
            const tableDiv = document.getElementById("clientes-table-scroll");
            if (!tableDiv) return;
            const { scrollTop, scrollHeight, clientHeight } = tableDiv;
            if (scrollTop + clientHeight >= scrollHeight - 40 && !isFetching && visibleCount < filtered.length) {
                setIsFetching(true);
                setTimeout(() => {
                    setVisibleCount((prev) => Math.min(prev + 20, filtered.length));
                    setIsFetching(false);
                }, 300); // Simula delay
            }
        }
        const tableDiv = document.getElementById("clientes-table-scroll");
        if (tableDiv) tableDiv.addEventListener("scroll", handleScroll);
        return () => {
            if (tableDiv) tableDiv.removeEventListener("scroll", handleScroll);
        };
    }, [filtered.length, isFetching, visibleCount]);

    useEffect(() => {
        setVisibleCount(20);
    }, [search]);

    // Placeholder para futura integração de API
    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/sua-api-aqui');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchData();
    }, []);
    */

    return (
        <section className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 transition-colors py-3 sm:py-6 font-inter">
            <div className="w-full px-2 sm:px-4 md:px-8 flex flex-col flex-1">
                <h1 className="text-lg sm:text-xl font-semibold text-left text-blue-800 dark:text-white tracking-tight mb-4 sm:mb-6">
                    Clientes
                </h1>
                <div className="w-full flex items-start mb-4 pl-2 sm:pl-0">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md self-start">
                        <SearchBar search={search} setSearch={setSearch} />
                    </div>
                </div>
                {/* Tabela responsiva com scroll infinito */}
                <div className="overflow-x-auto w-full">
                    <div className="block sm:hidden text-center text-xs text-gray-500 dark:text-gray-400 mb-1 select-none">Arraste a tabela para o lado →</div>
                    <div id="clientes-table-scroll" className="overflow-auto rounded-xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 min-w-full xs:min-w-[600px] sm:min-w-[900px] max-h-[85vh] md:max-h-[900px] custom-scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                        <style>{`
                            #clientes-table-scroll::-webkit-scrollbar { display: none !important; }
                            #clientes-table-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
                        `}</style>
                        <table className="w-full table-auto text-[11px] xs:text-xs sm:text-sm text-left text-gray-900 dark:text-white align-middle">
                            <thead>
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Nome</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[100px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider hidden xs:table-cell">Logradouro</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[60px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider hidden sm:table-cell">Número</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[100px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider hidden xs:table-cell">Bairro</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[100px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider hidden xs:table-cell">Cidade</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[100px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider hidden md:table-cell">CPF</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider hidden md:table-cell">Email</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[110px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider hidden sm:table-cell">Telefone</th>
                                    <th className="px-2 sm:px-4 py-2 min-w-[60px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-2 sm:px-4 py-8 text-center text-gray-500 dark:text-gray-300 text-xs sm:text-sm">
                                            Nenhum cliente encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.slice(0, visibleCount).map((cliente) => (
                                        <tr key={cliente.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                            <td className="px-2 sm:px-4 py-2 min-w-[120px] align-middle">
                                                <Link to={`/cliente/${cliente.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                                    {cliente.NOME}
                                                </Link>
                                            </td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[100px] hidden xs:table-cell align-middle">{cliente.LOGRADOURO}</td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[60px] hidden sm:table-cell align-middle">{cliente.NUMERO}</td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[100px] hidden xs:table-cell align-middle">{cliente.BAIRRO}</td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[100px] hidden xs:table-cell align-middle">{cliente.CIDADE}</td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[100px] hidden md:table-cell align-middle">{cliente.CPF}</td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[120px] hidden md:table-cell align-middle">{cliente.EMAIL}</td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[110px] hidden sm:table-cell align-middle">
                                                {cliente.TELEFONE}
                                                <a
                                                    href={`https://wa.me/55${cliente.TELEFONE.replace(/\D/g, "")}?text=Olá! ${cliente.NOME}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Enviar mensagem para ${cliente.NOME} via WhatsApp`}
                                                    title={`Enviar mensagem para ${cliente.NOME} via WhatsApp`}
                                                >
                                                    <img
                                                        width="24"
                                                        height="24"
                                                        src="https://img.icons8.com/color/48/whatsapp--v1.png"
                                                        alt="WhatsApp"
                                                    />
                                                </a>
                                            </td>
                                            <td className="px-2 sm:px-4 py-2 min-w-[60px] align-middle">
                                                <Link to={`/cadastro-os/novo?clienteId=${cliente.id}`} aria-label="Criar ordem de serviço" title="Criar ordem de serviço">
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
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {isFetching && (
                            <div className="w-full text-center py-2 text-xs text-gray-500 dark:text-gray-300">Carregando mais clientes...</div>
                        )}
                        {filtered.length > 0 && visibleCount >= filtered.length && (
                            <div className="w-full text-center py-2 text-xs text-gray-400 dark:text-gray-500">Todos os clientes exibidos.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Exporta interface Cliente para uso externo
export type { Cliente };

export interface ClienteForm {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    dataNascimento: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
}

// Adapta Cliente para ter os campos compatíveis com o formulário de detalhe/edição
export default Clientes;