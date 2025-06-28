// MinhasVendas.tsx
// Tela de extrato de vendas do usuário.
// Exibe tabela de vendas, com busca e filtro por data.
// Responsivo, dark mode, fonte Inter e mock data.
//
// Recursos:
// - Busca por texto e filtro por data.
// - Tabela de vendas com paginação (se necessário).

import React, { useEffect, useState } from "react";

const vendasMock = [
    {
        data: "2025-06-01",
        descricao: "Venda balcão #1",
        os: "1234",
        tipo: "Entrada",
        valor: "R$: 500,00",
        forma: "PIX"
    },
    {
        data: "2025-06-05",
        descricao: "Venda balcão #2",
        os: "1235",
        tipo: "Entrada",
        valor: "R$: 800,00",
        forma: "DINHEIRO"
    },
    {
        data: "2025-06-10",
        descricao: "Recebimento OS #3",
        os: "1236",
        tipo: "Entrada",
        valor: "R$: 1200,00",
        forma: "CREDITO"
    },
    // ...adicione mais mocks se quiser
];

const MinhasVendas: React.FC = () => {
    const [search, setSearch] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    useEffect(() => {
        document.documentElement.classList.add('dark');
        // Simulação de dados e renderização (substitua por chamada real se necessário)
        document.getElementById('eu')!.textContent = 'R$ 5.000,00';
        document.getElementById('eu_qtd')!.textContent = '20 vendas';
        document.getElementById('pm')!.textContent = 'Meta: R$ 7.000,00';
    }, []);

    // Filtro de pesquisa e data
    const vendasFiltradas = vendasMock.filter(v => {
        const matchSearch =
            v.descricao.toLowerCase().includes(search.toLowerCase()) ||
            v.os.toLowerCase().includes(search.toLowerCase()) ||
            v.forma.toLowerCase().includes(search.toLowerCase());
        const matchDataInicio = dataInicio ? v.data >= dataInicio : true;
        const matchDataFim = dataFim ? v.data <= dataFim : true;
        return matchSearch && matchDataInicio && matchDataFim;
    });

    return (
        <div className=" bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 flex flex-col p-4">
            <div className="w-full max-w-2xl mx-auto">
                {/* Mensagens de alerta (simulado) */}
                <div className="text-center mb-4">
                    {/* Exemplo de mensagem: <div className="alert alert-success">Sucesso!</div> */}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
                    <h5 className="text-xl font-bold mb-2 text-center">Minhas Vendas no mês</h5>
                    <p className="text-lg text-center mb-2">
                        <span className="ml-4" id="eu"></span>
                        <span className="ml-4" id="eu_qtd"></span>
                    </p>
                    <span className="block text-center text-sm text-gray-600 dark:text-gray-300" id="pm"></span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h5 className="text-xl font-bold mb-4 text-center">Extrato de Vendas Registradas</h5>
                    {/* Barra de pesquisa e filtro de data logo abaixo do título */}
                    <div className="flex flex-col md:flex-row gap-2 mb-4 items-center justify-between">
                        <input
                            type="text"
                            className="p-2 rounded border dark:bg-gray-800 dark:text-white w-full md:w-1/2"
                            placeholder="Pesquisar por descrição, OS ou forma..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <div className="flex gap-2 w-full md:w-auto">
                            <input
                                type="date"
                                className="p-2 rounded border dark:bg-gray-800 dark:text-white"
                                value={dataInicio}
                                onChange={e => setDataInicio(e.target.value)}
                            />
                            <span className="self-center">até</span>
                            <input
                                type="date"
                                className="p-2 rounded border dark:bg-gray-800 dark:text-white"
                                value={dataFim}
                                onChange={e => setDataFim(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm md:text-base bg-white dark:bg-gray-800 rounded shadow">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 border-b text-left">Data</th>
                                    <th className="px-2 py-2 border-b text-left">Descrição</th>
                                    <th className="px-2 py-2 border-b text-left">OS</th>
                                    <th className="px-2 py-2 border-b text-left">Valor</th>
                                    <th className="px-2 py-2 border-b text-left">Forma</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendasFiltradas.map((v, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="px-2 py-2 border-b">{v.data}</td>
                                        <td className="px-2 py-2 border-b">{v.descricao}</td>
                                        <td className="px-2 py-2 border-b">{v.os}</td>
                                        <td className="px-2 py-2 border-b">{v.valor}</td>
                                        <td className="px-2 py-2 border-b">{v.forma}</td>
                                    </tr>
                                ))}
                                {vendasFiltradas.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">Nenhuma venda encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinhasVendas;

// Responsividade garantida com Tailwind: tabelas usam overflow-x-auto, filtros e busca se adaptam em colunas/linhas conforme o tamanho da tela.
// Certifique-se de que todos os elementos fiquem acessíveis em dispositivos móveis.
