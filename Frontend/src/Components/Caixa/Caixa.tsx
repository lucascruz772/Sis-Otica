// Caixa.tsx
// Tela principal de controle de caixa (financeiro).
// Exibe saldo, histórico de movimentações e ações de caixa.
// Usa mock data, responsivo, dark mode e fonte Inter.
//
// Props:
// - dados: array de movimentações do caixa.
// - saldo: saldo atual do caixa.
// - saldoTotal: saldo total acumulado.
// - paginaAtual: página atual da paginação.
// - totalPaginas: total de páginas.
// - onPageChange: função para trocar de página.
// - onVisualizarMesAnterior: função para visualizar mês anterior.
// - onFecharCaixa: função para fechar o caixa.
// - messages: mensagens do sistema.
//
// Responsividade garantida com Tailwind: uso de flex, grid, breakpoints (sm, md, lg), overflow-x-auto para tabelas e containers.
// Certifique-se de que tabelas e cards não estourem a tela em dispositivos móveis.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export interface Lancamento {
    data: string;
    descricao: string;
    os: string;
    tipo: string;
    valor: string;
    forma: string;
}

export interface CaixaProps {
    dados: Lancamento[];
    saldo: number;
    saldoTotal: number;
    paginaAtual: number;
    totalPaginas: number;
    onPageChange: () => void;
    onVisualizarMesAnterior: () => void;
    onFecharCaixa: () => void;
    messages: string[];
}

const Caixa: React.FC<CaixaProps> = (

) => {
    const navigate = useNavigate();

    function gerarLancamentosMock(qtd: number) {
        const tipos = ["Entrada", "Saida"];
        const formas = ["PIX", "DEBITO", "CREDITO", "DINHEIRO", "BOLETO"];
        const descricoes = [
            "Venda balcão", "Pagamento fornecedor", "Pix recebido", "Compra estoque", "Recebimento OS", "Pagamento funcionário", "Transferência", "Ajuste caixa", "Pagamento conta", "Recebimento mensalidade"
        ];
        const mocks = [];
        for (let i = 1; i <= qtd; i++) {
            const tipo = tipos[Math.floor(Math.random() * tipos.length)];
            const forma = formas[Math.floor(Math.random() * formas.length)];
            const valor = (Math.random() * 1000 + 1).toFixed(2);
            const data = new Date(2025, 5, Math.floor(Math.random() * 28) + 1);
            mocks.push({
                data: data.toLocaleDateString('pt-BR'),
                descricao: descricoes[Math.floor(Math.random() * descricoes.length)] + ` #${i}`,
                os: Math.random() > 0.5 ? String(Math.floor(Math.random() * 10000)) : "",
                tipo,
                valor: `R$: ${valor}`,
                forma,
            });
        }
        return mocks;
    }

    // Estado dos lançamentos mockados
    const [lancamentos] = useState(() => gerarLancamentosMock(50));
    // Paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const totalPaginas = Math.ceil(lancamentos.length / itensPorPagina);
    const lancamentosPagina = lancamentos.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

    // Estado inicia como false, mensagem não aparece ao carregar a página
    const [showSuccess, setShowSuccess] = useState(false);
    const [showConfirmFechar, setShowConfirmFechar] = useState(false);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    return (
        <div className="relative bg-white dark:bg-gray-900 py-8 px-4 flex flex-col items-center transition-colors duration-300">
            {/* Linha de topo com botão totalmente à esquerda e botão Adicionar Caixa à direita */}
            <div className="w-full flex mb-4 justify-between">
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white rounded px-4 py-2 font-semibold shadow"
                    onClick={() => navigate("/caixa-mes")}
                >
                    Visualizar Mês anteriores
                </button>
            </div>

            {/* Mensagem de sucesso */}
            {showSuccess && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 w-full max-w-4xl text-center font-medium">
                    Cadastrado com sucesso
                </div>
            )}

            {/* Tabela de lançamentos */}
            <div className={`w-full flex-1 pr-0 md:pr-[340px]${itensPorPagina > 10 ? ' overflow-x-auto' : ''}`} >
                <div className="overflow-x-auto">
                    <table className={`w-full bg-white dark:bg-gray-800 rounded shadow table-fixed${itensPorPagina > 10 ? ' min-w-[900px]' : ''}`}>
                        <thead>
                            <tr>
                                <th className="px-2 md:px-4 py-2 border-b text-left w-[12%] text-xs md:text-base">DATA</th>
                                <th className="px-2 md:px-4 py-2 border-b text-left w-[32%] text-xs md:text-base">DESCRIÇÃO</th>
                                <th className="px-2 md:px-4 py-2 border-b text-left w-[10%] text-xs md:text-base">OS</th>
                                <th className="px-2 md:px-4 py-2 border-b text-left w-[12%] text-xs md:text-base">TIPO</th>
                                <th className="px-2 md:px-4 py-2 border-b text-left w-[18%] text-xs md:text-base">VALOR</th>
                                <th className="px-2 md:px-4 py-2 border-b text-left w-[16%] text-xs md:text-base">FORMA</th>
                                <th className="px-2 md:px-4 py-2 border-b text-center w-[16%] text-xs md:text-base">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lancamentosPagina.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 dark:text-gray-400">Nenhum lançamento cadastrado.</td>
                                </tr>
                            )}
                            {lancamentosPagina.map((l, idx) => (
                                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 border-b">{l.data}</td>
                                    <td className="px-4 py-2 border-b">{l.descricao}</td>
                                    <td className="px-4 py-2 border-b">{l.os}</td>
                                    <td className="px-4 py-2 border-b">{l.tipo}</td>
                                    <td className="px-4 py-2 border-b">{l.valor}</td>
                                    <td className="px-4 py-2 border-b">{l.forma}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button title="Editar" className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded p-2 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4 1a1 1 0 01-1.263-1.263l1-4a4 4 0 01.828-1.414z" /></svg>
                                        </button>
                                        <button title="Excluir" className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Paginação e selecionador de quantidade */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-4 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" disabled={paginaAtual === 1} onClick={() => setPaginaAtual(paginaAtual - 1)}>{'<'}</button>
                        <span className="text-gray-700 dark:text-gray-300">{paginaAtual} de {totalPaginas}</span>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" disabled={paginaAtual === totalPaginas} onClick={() => setPaginaAtual(paginaAtual + 1)}>{'>'}</button>
                        {/* Selecionador de quantidade ao lado direito */}
                        <div className="flex items-center gap-2 ml-0 md:ml-4 mt-2 md:mt-0">
                            <label className="text-gray-700 dark:text-gray-300" htmlFor="itensPorPagina">Exibir</label>
                            <select
                                id="itensPorPagina"
                                className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                                value={itensPorPagina}
                                onChange={e => { setItensPorPagina(Number(e.target.value)); setPaginaAtual(1); }}
                                style={{ minWidth: 0 }}
                            >
                                {[5, 10, 20, 50].map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                            <span className="text-gray-700 dark:text-gray-300">por página</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Painel lateral */}
            <div className="fixed md:top-32 top-auto bottom-0 md:bottom-auto right-0 md:right-12 w-full md:w-[300px] z-10 bg-white/90 dark:bg-gray-900/90 md:bg-transparent md:dark:bg-transparent p-2 md:p-0 border-t md:border-none border-gray-200 md:border-0 flex md:block justify-center md:justify-start">
                <div className="mb-2 w-full md:w-auto flex flex-col items-center md:items-stretch">
                    {/* Botão Adicionar Caixa acima do Fechar Caixa */}
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 font-semibold shadow w-full mb-2"
                        onClick={() => navigate("/caixa/adicionar")}
                    >
                        Adicionar Caixa
                    </button>
                    <div className="border border-indigo-500 rounded px-4 py-2 mb-2 text-center font-semibold bg-white dark:bg-gray-800 w-full md:w-auto">
                        Saldo em dinheiro
                        <div className="font-bold">R$ 0.0</div>
                    </div>
                    <div className="border border-indigo-500 rounded px-4 py-2 mb-2 text-center font-semibold bg-white dark:bg-gray-800 w-full md:w-auto">
                        Total de entradas
                        <div className="font-bold">R$ 1.0</div>
                    </div>
                </div>
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded px-4 py-2 w-full shadow"
                    onClick={() => setShowConfirmFechar(true)}
                >
                    Fechar Caixa
                </button>
                {/* Modal de confirmação */}
                {showConfirmFechar && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80 text-center">
                            <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">Deseja realmente fechar o caixa?</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    onClick={() => setShowConfirmFechar(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded"
                                    onClick={() => { setShowConfirmFechar(false); /* Aqui pode chamar a função de fechar caixa */ }}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Caixa;
