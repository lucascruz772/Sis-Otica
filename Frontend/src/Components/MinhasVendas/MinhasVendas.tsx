// MinhasVendas.tsx
// Tela de extrato de vendas do usuário.
// Exibe tabela de vendas, com busca e filtro por data.
// Responsivo, dark mode, fonte Inter e mock data.
//
// Recursos:
// - Busca por texto e filtro por data.
// - Tabela de vendas com paginação (se necessário).

import React, { useEffect } from "react";
import { useMinhasVendas } from "./hooks/useMinhasVendas";
import MinhasVendasFilters from "./MinhasVendasFilters";
import MinhasVendasTable from "./MinhasVendasTable";
import MinhasVendasCardList from "./MinhasVendasCardList";

const MinhasVendas: React.FC = () => {
    const {
        search, setSearch,
        dataInicio, setDataInicio,
        dataFim, setDataFim,
        currentPage, setCurrentPage,
        pageSize, setPageSize,
        PAGE_SIZE_OPTIONS,
        totalPages,
        paginated
    } = useMinhasVendas();

    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.getElementById('eu')!.textContent = 'R$ 5.000,00';
        document.getElementById('eu_qtd')!.textContent = '20 vendas';
        document.getElementById('pm')!.textContent = 'Meta: R$ 7.000,00';
    }, []);

    return (
        <div className="font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="w-full min-w-0 px-2 sm:px-4 md:px-8 py-3 sm:py-6">
                {/* Título centralizado no topo */}
                <h5 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Extrato de Vendas Registradas</h5>
                <div className="w-full flex flex-col flex-1 min-w-0">
                    {/* Mensagens de alerta (simulado) */}
                    <div className="text-center mb-4">
                        {/* Exemplo de mensagem: <div className="alert alert-success">Sucesso!</div> */}
                    </div>
                    {/* Card do título discreto, alinhado à esquerda, agora com informações de venda dentro */}
                    <div className="bg-white dark:bg-gray-800 rounded shadow p-2 mb-3 w-full max-w-xs text-left flex flex-col gap-1">
                        <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Minhas vendas - Período</h5>
                        <div className="flex flex-col gap-0.5">
                            <span id="eu" className="text-base text-gray-700 dark:text-gray-200"></span>
                            <span id="eu_qtd" className="text-base text-gray-700 dark:text-gray-200"></span>
                            <span id="pm" className="text-sm text-gray-500 dark:text-gray-400"></span>
                        </div>
                    </div>
                    {/* Filtros e busca em linha, compactos e responsivos */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
                        <MinhasVendasFilters
                            search={search} setSearch={setSearch}
                            dataInicio={dataInicio} setDataInicio={setDataInicio}
                            dataFim={dataFim} setDataFim={setDataFim}
                        />
                        {/* Tabela e cards */}
                        <div className="overflow-x-auto">
                            {/* Cards para mobile */}
                            <MinhasVendasCardList paginated={paginated} />
                            {/* Tabela tradicional para desktop */}
                            <MinhasVendasTable paginated={paginated} />
                        </div>
                        {/* Paginação e quantidade */}
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
                </div>
            </div>
        </div>
    );
};

export default MinhasVendas;

// Responsividade garantida com Tailwind: tabelas usam overflow-x-auto, filtros e busca se adaptam em colunas/linhas conforme o tamanho da tela.
// Certifique-se de que todos os elementos fiquem acessíveis em dispositivos móveis.
