import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdicionarCaixa from "./AdicionarCaixa";
import Money from "./Money";

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
                valor: `R$ ${valor}`,
                forma,
            });
        }
        return mocks;
    }

    // Estado dos lançamentos mockados (agora persistente no localStorage)
    const [lancamentos, setLancamentos] = useState<Lancamento[]>(() => {
        const salvo = localStorage.getItem("caixa_lancamentos");
        if (salvo) {
            try {
                return JSON.parse(salvo);
            } catch {
                // fallback para mock se corrompido
            }
        }
        const mocks = gerarLancamentosMock(50);
        localStorage.setItem("caixa_lancamentos", JSON.stringify(mocks));
        return mocks;
    });

    // Sempre que alterar lançamentos, salva no localStorage
    useEffect(() => {
        localStorage.setItem("caixa_lancamentos", JSON.stringify(lancamentos));
    }, [lancamentos]);

    // Estado para edição
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [editData, setEditData] = useState<Lancamento | null>(null);
    // Filtros
    const [busca, setBusca] = useState("");
    const [filtroDataIni, setFiltroDataIni] = useState("");
    const [filtroDataFim, setFiltroDataFim] = useState("");
    const [filtroOS, setFiltroOS] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroForma, setFiltroForma] = useState("");

    // Função para filtrar lançamentos
    function filtrarLancamentos() {
        // Ordena por data crescente antes de filtrar
        const ordenados = [...lancamentos].sort((a, b) => {
            const [da, ma, ya] = a.data.split("/");
            const [db, mb, yb] = b.data.split("/");
            const dataA = new Date(+ya, +ma - 1, +da);
            const dataB = new Date(+yb, +mb - 1, +db);
            return dataA.getTime() - dataB.getTime();
        });
        return ordenados.filter(l => {
            const buscaOk = busca === "" || l.descricao.toLowerCase().includes(busca.toLowerCase());
            const osOk = filtroOS === "" || l.os === filtroOS;
            const tipoOk = filtroTipo === "" || l.tipo === filtroTipo;
            const formaOk = filtroForma === "" || l.forma.toLowerCase() === filtroForma.toLowerCase();
            let dataOk = true;
            if (filtroDataIni) {
                const [d, m, y] = l.data.split("/");
                const dataLanc = new Date(+y, +m - 1, +d);
                const dataIni = new Date(filtroDataIni);
                if (dataLanc < dataIni) dataOk = false;
            }
            if (filtroDataFim) {
                const [d, m, y] = l.data.split("/");
                const dataLanc = new Date(+y, +m - 1, +d);
                const dataFim = new Date(filtroDataFim);
                if (dataLanc > dataFim) dataOk = false;
            }
            return buscaOk && osOk && tipoOk && formaOk && dataOk;
        });
    }

    const lancamentosFiltrados = filtrarLancamentos();
    // Scroll infinito: exibe todos os lançamentos filtrados
    // const totalPaginas = Math.ceil(lancamentosFiltrados.length / itensPorPagina);
    // const lancamentosPagina = lancamentosFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

    // Cálculo dos totais
    const totalEntradas = lancamentosFiltrados.filter(l => l.tipo === "Entrada").reduce((acc, l) => acc + Number(l.valor.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.')), 0);
    const saldoDinheiro = lancamentosFiltrados.filter(l => l.forma.toLowerCase() === "dinheiro").reduce((acc, l) => {
        const valor = Number(l.valor.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.'));
        return l.tipo === "Entrada" ? acc + valor : acc - valor;
    }, 0);

    // Estado inicia como false, mensagem não aparece ao carregar a página
    const [showSuccess, setShowSuccess] = useState(false);
    const [showForm, setShowForm] = useState(false);
    // Mensagem de sucesso customizada
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    useEffect(() => {
        if (showSuccess || successMsg) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setSuccessMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, successMsg]);

    // Função para iniciar edição
    function handleEdit(idx: number) {
        setEditIdx(idx);
        setEditData({ ...lancamentos[idx] });
    }
    // Função para salvar edição
    function handleSave(idx: number) {
        if (editData) {
            const globalIdx = idx;
            setLancamentos(prev => {
                const novo = prev.map((l, i) => i === globalIdx ? editData : l);
                localStorage.setItem("caixa_lancamentos", JSON.stringify(novo));
                return novo;
            });
            setEditIdx(null);
            setEditData(null);
            setSuccessMsg('Lançamento editado com sucesso!');
        }
    }
    // Função para cancelar edição
    function handleCancel() {
        setEditIdx(null);
        setEditData(null);
    }
    // Função para excluir
    function handleDelete(idx: number) {
        if (window.confirm('Deseja realmente excluir este lançamento?')) {
            const globalIdx = idx;
            setLancamentos(prev => {
                const novo = prev.filter((_, i) => i !== globalIdx);
                localStorage.setItem("caixa_lancamentos", JSON.stringify(novo));
                return novo;
            });
            setSuccessMsg('Lançamento excluído com sucesso!');
        }
    }

    return (
        <div className="relative bg-white dark:bg-gray-900 py-8 px-4 flex flex-col items-center transition-colors duration-300">
            {/* Mensagem de feedback fixa logo abaixo da navbar */}
            {successMsg && (
                <div className="fixed left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50" style={{ top: 88 }}>
                    {successMsg}
                </div>
            )}
            {/* Linha de topo com botões compactos e espaçados */}
            <div className="w-full flex mb-4 gap-2 justify-between flex-wrap items-center">
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-3 py-1.5 h-8 text-sm font-semibold shadow flex-1 sm:flex-none min-w-[140px]"
                    onClick={() => navigate("/caixa-mes")}
                >
                    Meses anteriores
                </button>
            </div>

            {/* Filtros e busca */}
            <div className="w-full flex flex-wrap gap-2 mb-4 items-end">
                <input
                    type="search"
                    placeholder="Buscar descrição..."
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white w-40 sm:w-56"
                />
                <input
                    type="date"
                    value={filtroDataIni}
                    onChange={e => setFiltroDataIni(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white"
                    title="Data inicial"
                />
                <input
                    type="date"
                    value={filtroDataFim}
                    onChange={e => setFiltroDataFim(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white"
                    title="Data final"
                />
                <input
                    type="text"
                    placeholder="OS"
                    value={filtroOS}
                    onChange={e => setFiltroOS(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white w-16"
                />
                <select
                    value={filtroTipo}
                    onChange={e => setFiltroTipo(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white"
                >
                    <option value="">Tipo</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                </select>
                <select
                    value={filtroForma}
                    onChange={e => setFiltroForma(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-900 dark:text-white"
                >
                    <option value="">Forma</option>
                    <option value="Pix">Pix</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Carnê">Carnê</option>
                    <option value="Permuta">Permuta</option>
                </select>
            </div>

            {/* Tabela de lançamentos estilizada padrão PesquisaView/ClienteList */}
            <div
                id="caixa-scroll"
                className="w-full max-w-5xl ml-0 mr-auto overflow-x-auto overflow-y-auto max-h-[70vh] min-h-[300px] custom-scrollbar-hide rounded-xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
                <style>{`
                    #caixa-scroll::-webkit-scrollbar { display: none !important; }
                    #caixa-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
                `}</style>
                <table className="min-w-full w-full text-xs sm:text-sm text-left text-gray-900 dark:text-white">
                    <thead>
                        <tr className="bg-blue-50 dark:bg-gray-900">
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 min-w-[80px]">DATA</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 min-w-[120px]">DESCRIÇÃO</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 min-w-[60px]">OS</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 min-w-[70px]">TIPO</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 min-w-[90px]">VALOR</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 min-w-[80px]">FORMA</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 min-w-[80px]">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lancamentosFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-b-xl">
                                    Nenhum lançamento cadastrado.
                                </td>
                            </tr>
                        )}
                        {lancamentosFiltrados.map((l, idx) => (
                            <tr key={idx} className={`transition ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-900'} hover:bg-blue-100 dark:hover:bg-gray-700`}>
                                {editIdx === idx ? (
                                    <>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700"><input className="form-input w-full text-black" value={editData?.data || ''} onChange={e => setEditData(d => d ? { ...d, data: e.target.value } : d)} /></td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700"><input className="form-input w-full text-black" value={editData?.descricao || ''} onChange={e => setEditData(d => d ? { ...d, descricao: e.target.value } : d)} /></td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700"><input className="form-input w-full text-black" value={editData?.os || ''} onChange={e => setEditData(d => d ? { ...d, os: e.target.value } : d)} /></td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700">
                                            <select className="form-input w-full text-black" value={editData?.tipo || ''} onChange={e => setEditData(d => d ? { ...d, tipo: e.target.value } : d)}>
                                                <option value="E">Entrada</option>
                                                <option value="S">Saída</option>
                                            </select>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700"><input className="form-input w-full text-black" value={editData?.valor || ''} onChange={e => {
                                            let v = e.target.value.replace(/[^\d]/g, "");
                                            v = (Number(v) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                                            setEditData(d => d ? { ...d, valor: v } : d);
                                        }} /></td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700">
                                            <select className="form-input w-full text-black" value={editData?.forma || ''} onChange={e => setEditData(d => d ? { ...d, forma: e.target.value } : d)}>
                                                <option value="A">Pix</option>
                                                <option value="B">Dinheiro</option>
                                                <option value="C">Débito</option>
                                                <option value="D">Crédito</option>
                                                <option value="E">Carnê</option>
                                                <option value="F">Permuta</option>
                                            </select>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 text-center">
                                            <button title="Salvar" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded p-1.5 sm:p-2 mr-1 sm:mr-2" onClick={() => handleSave(idx)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            </button>
                                            <button title="Cancelar" className="inline-flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white rounded p-1.5 sm:p-2" onClick={handleCancel}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">{l.data}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">{l.descricao}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">{l.os}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">{l.tipo}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"><Money value={l.valor} /></td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">{l.forma}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 text-center bg-white dark:bg-gray-900">
                                            <button title="Editar" className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 dark:text-gray-900 rounded p-1.5 sm:p-2 mr-1 sm:mr-2" onClick={() => handleEdit(idx)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4 1a1 1 0 01-1.263-1.263l1-4a4 4 0 01.828-1.414z" /></svg>
                                            </button>
                                            <button title="Excluir" className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded p-1.5 sm:p-2" onClick={() => handleDelete(idx)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Painel lateral responsivo */}
            {/* Fixo à direita em telas extra grandes */}
            <div className="hidden xl:block fixed top-32 right-12 w-[300px] ">
                <div className="mb-2">
                    <div className="border border-indigo-500 rounded px-4 py-2 mb-2 text-center font-semibold bg-white dark:bg-gray-800">
                        Saldo em dinheiro
                        <div className="font-bold"><Money value={saldoDinheiro} /></div>
                    </div>
                    <div className="border border-indigo-500 rounded px-4 py-2 mb-2 text-center font-semibold bg-white dark:bg-gray-800">
                        Total de entradas
                        <div className="font-bold"><Money value={totalEntradas} /></div>
                    </div>
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded px-4 py-2 w-full shadow mb-2">
                    Fechar Caixa
                </button>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 w-full shadow font-semibold"
                    onClick={() => setShowForm((v) => !v)}
                >
                    {showForm ? "Cancelar" : "Adicionar Caixa"}
                </button>
                {showSuccess && (
                    <div className="absolute left-0 right-0 mx-auto mt-2 flex justify-center pointer-events-none" style={{ top: '100%' }}>
                        <div className="bg-green-100 border border-green-400 text-green-800 px-3 py-2 rounded text-sm font-medium shadow transition-all duration-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700">
                            Caixa adicionado com sucesso!
                        </div>
                    </div>
                )}
                {showForm && (
                    <div className="mt-4">
                        <AdicionarCaixa onClose={() => setShowForm(false)} onSuccess={() => setShowSuccess(true)} />
                    </div>
                )}
            </div>
            {/* Bloco normal abaixo da tabela em telas menores que xl */}
            <div className="block xl:hidden w-full mt-6">
                <div className="mb-2">
                    <div className="border border-indigo-500 rounded px-1.5 py-1 mb-2 text-center font-semibold bg-white dark:bg-gray-800 text-xs">
                        Saldo em dinheiro
                        <div className="font-bold text-sm"><Money value={saldoDinheiro} /></div>
                    </div>
                    <div className="border border-indigo-500 rounded px-1.5 py-1 mb-2 text-center font-semibold bg-white dark:bg-gray-800 text-xs">
                        Total de entradas
                        <div className="font-bold text-sm"><Money value={totalEntradas} /></div>
                    </div>
                </div>
                <div className="relative flex flex-col gap-2 mb-2 justify-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded px-2 py-1 w-full shadow text-xs mb-1">
                        Fechar Caixa
                    </button>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 w-full shadow text-xs font-semibold"
                        onClick={() => setShowForm((v) => !v)}
                    >
                        {showForm ? "Cancelar" : "Adicionar Caixa"}
                    </button>
                    {showSuccess && (
                        <div className="absolute left-0 right-0 mx-auto mt-2 flex justify-center pointer-events-none" style={{ top: '100%' }}>
                            <div className="bg-green-100 border border-green-400 text-green-800 px-3 py-2 rounded text-xs font-medium shadow transition-all duration-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700">
                                Caixa adicionado com sucesso!
                            </div>
                        </div>
                    )}
                </div>
                {showForm && (
                    <div className="mt-4">
                        <AdicionarCaixa onClose={() => setShowForm(false)} onSuccess={() => setShowSuccess(true)} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Caixa;
