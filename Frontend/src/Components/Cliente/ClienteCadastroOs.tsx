import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BotoesGerenciarOs from "./BotoesGerenciarOs";
import { FaArrowLeft } from "react-icons/fa";

interface ClienteCadastroOsProps {
    clienteId?: number;
    clienteNome?: string;
}

// Interface dos campos da O.S.
interface NovaOS {
    DATA_SOLICITACAO: string;
    PREVISAO_ENTREGA: string;
    VENDEDOR: string;
    CLIENTE: string;
    SERVICO: string;
    LABORATORIO: string;
    OD_ESF: string;
    OD_CIL: string;
    OD_EIXO: string;
    OE_ESF: string;
    OE_CIL: string;
    OE_EIXO: string;
    AD: string;
    DNP: string;
    P: string;
    DPA: string;
    DIAG: string;
    V: string;
    H: string;
    ALT: string;
    ARM: string;
    MONTAGEM: string;
    LENTES: string;
    ARMACAO: string;
    OBSERVACAO: string;
    FORMA_PAG: string;
    VALOR: string;
    QUANTIDADE_PARCELA: string;
    ENTRADA: string;
}

const initialState: NovaOS = {
    DATA_SOLICITACAO: "",
    PREVISAO_ENTREGA: "",
    VENDEDOR: "",
    CLIENTE: "",
    SERVICO: "",
    LABORATORIO: "",
    OD_ESF: "",
    OD_CIL: "",
    OD_EIXO: "",
    OE_ESF: "",
    OE_CIL: "",
    OE_EIXO: "",
    AD: "",
    DNP: "",
    P: "",
    DPA: "",
    DIAG: "",
    V: "",
    H: "",
    ALT: "",
    ARM: "",
    MONTAGEM: "",
    LENTES: "",
    ARMACAO: "",
    OBSERVACAO: "",
    FORMA_PAG: "",
    VALOR: "",
    QUANTIDADE_PARCELA: "",
    ENTRADA: "",
};

// Função para máscara de dinheiro
function formatMoney(value: string) {
    const onlyDigits = value.replace(/\D/g, "");
    const number = Number(onlyDigits) / 100;
    return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const ClienteCadastroOs: React.FC<ClienteCadastroOsProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const clienteId = props.clienteId || params.get("clienteId") || "";
    const clienteNome = props.clienteNome || "";

    const [form, setForm] = useState<NovaOS>({
        ...initialState,
        CLIENTE: clienteId ? String(clienteId) : "",
    });
    const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(null);

    // Mock para produtos do estoque
    const produtosEstoque = React.useMemo(() => {
        const local = localStorage.getItem("servicos");
        if (local) return JSON.parse(local).map((nome: string, i: number) => ({ id: i + 1, nome }));
        return Array.from({ length: 23 }, (_, i) => ({ id: i + 1, nome: `Produto ${i + 1}` }));
    }, []);
    // Mock para laboratórios (substituir pelo fetch real futuramente)
    const laboratorios = React.useMemo(() => {
        const local = localStorage.getItem("laboratorios");
        if (local) return JSON.parse(local);
        return ["Laboratório 1", "Laboratório 2", "Laboratório 3"];
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        // Máscara de dinheiro para os campos VALOR e ENTRADA
        if (name === "VALOR" || name === "ENTRADA") {
            setForm((prev) => ({ ...prev, [name]: formatMoney(value) }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            // POST para a API de cadastro de O.S.
            await axios.post("/api/v1/ordens/", form);
            setFeedbackMsg("O.S. cadastrada com sucesso!");
            setFeedbackType("success");
            setTimeout(() => {
                setFeedbackMsg(null);
                setFeedbackType(null);
                navigate("/kanban"); // Redireciona para o Kanban (ou "/pesquisa" se preferir)
            }, 1800);
        } catch {
            setFeedbackMsg("Erro ao cadastrar O.S. Por favor, tente novamente.");
            setFeedbackType("error");
            setTimeout(() => {
                setFeedbackMsg(null);
                setFeedbackType(null);
            }, 3000);
        }
    }

    return (
        <section className="min-h-screen w-full min-w-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col items-center py-10 px-2 sm:px-4 md:px-8">
            <div className="w-full max-w-4xl px-2 md:px-10">
                <div className="mb-4 flex justify-start gap-2 items-center">
                    <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => navigate(-1)} aria-label="Voltar">
                        <FaArrowLeft className="text-xl text-gray-700 dark:text-gray-200" />
                    </button>
                    <BotoesGerenciarOs />
                </div>
                {/* Feedback de sucesso/erro igual CaixaList */}
                {feedbackMsg && (
                    <div
                        className={`fixed left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg z-50 font-semibold text-center min-w-[220px] max-w-[90vw] ${feedbackType === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}
                        style={{ top: 88 }}
                        role="alert"
                        aria-live="assertive"
                    >
                        {feedbackMsg}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Título Venda */}
                    <h2 className="text-xl font-bold text-blue-700 dark:text-blue-200 mb-2 text-left">Venda</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {/* Data Pedido */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Data Pedido</label>
                            <input name="DATA_SOLICITACAO" type="date" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.DATA_SOLICITACAO} onChange={handleChange} required />
                        </div>
                        {/* Previsão Entrega */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Previsão Entrega</label>
                            <input name="PREVISAO_ENTREGA" type="date" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.PREVISAO_ENTREGA} onChange={handleChange} required />
                        </div>
                        {/* Vendedor */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Vendedor</label>
                            <input name="VENDEDOR" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.VENDEDOR} onChange={handleChange} required />
                        </div>
                        {/* Cliente */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Cliente</label>
                            <input name="CLIENTE" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={clienteNome || form.CLIENTE} readOnly={!!clienteId} onChange={handleChange} required />
                        </div>
                    </div>
                    {/* Título Serviço */}
                    <h2 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 text-left">Serviço</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {/* Tipo de Serviço (produto do estoque) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Tipo de Serviço</label>
                            <select
                                name="SERVICO"
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={form.SERVICO}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione o produto...</option>
                                {produtosEstoque.map((p: { id: number; nome: string }) => (
                                    <option key={p.id} value={p.nome}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Título Laboratório */}
                    <h2 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 text-left">Laboratório</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {/* Laboratório (select) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Laboratório</label>
                            <select
                                name="LABORATORIO"
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={form.LABORATORIO}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione o laboratório...</option>
                                {laboratorios.map((l: string, i: number) => (
                                    <option key={i} value={l}>{l}</option>
                                ))}
                            </select>
                        </div>
                        {/* OD - ESF, OD - CIL, OD - EIXO */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">OD - ESF</label>
                            <input name="OD_ESF" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.OD_ESF} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">OD - CIL</label>
                            <input name="OD_CIL" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.OD_CIL} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">OD - EIXO</label>
                            <input name="OD_EIXO" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.OD_EIXO} onChange={handleChange} />
                        </div>
                        {/* OE - ESF, OE - CIL, OE - EIXO */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">OE - ESF</label>
                            <input name="OE_ESF" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.OE_ESF} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">OE - CIL</label>
                            <input name="OE_CIL" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.OE_CIL} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">OE - EIXO</label>
                            <input name="OE_EIXO" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.OE_EIXO} onChange={handleChange} />
                        </div>
                        {/* AD */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">AD</label>
                            <input name="AD" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.AD} onChange={handleChange} />
                        </div>
                        {/* DNP, P, DPA, DIAG, V, H, ALT */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">DNP</label>
                            <input name="DNP" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.DNP} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">P</label>
                            <input name="P" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.P} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">DPA</label>
                            <input name="DPA" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.DPA} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">DIAG</label>
                            <input name="DIAG" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.DIAG} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">V</label>
                            <input name="V" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.V} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">H</label>
                            <input name="H" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.H} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">ALT</label>
                            <input name="ALT" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.ALT} onChange={handleChange} />
                        </div>
                        {/* ARM, Montagem */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">ARM</label>
                            <input name="ARM" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.ARM} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Montagem</label>
                            <input name="MONTAGEM" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.MONTAGEM} onChange={handleChange} />
                        </div>
                    </div>
                    {/* Título Lentes */}
                    <h2 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 text-left">Lentes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Lentes</label>
                            <input name="LENTES" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.LENTES} onChange={handleChange} />
                        </div>
                    </div>
                    {/* Título Armação */}
                    <h2 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 text-left">Armação</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Armação</label>
                            <input name="ARMACAO" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.ARMACAO} onChange={handleChange} />
                        </div>
                    </div>
                    {/* Observação */}
                    <div className="sm:col-span-2 md:col-span-4">
                        <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Observação</label>
                        <textarea name="OBSERVACAO" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none resize-none" rows={3} value={form.OBSERVACAO} onChange={handleChange} />
                    </div>
                    {/* Título Financeiro */}
                    <div className="sm:col-span-2 md:col-span-4 mt-2">
                        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2">Financeiro</h2>
                    </div>
                    {/* Pagamento, Valor, Parcelas, Valor Pago... */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {/* Pagamento */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Pagamento</label>
                            <select
                                name="FORMA_PAG"
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={form.FORMA_PAG}
                                onChange={handleChange}
                            >
                                <option value="">Selecione</option>
                                <option value="Pix">Pix</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Débito">Débito</option>
                                <option value="Crédito">Crédito</option>
                                <option value="Carnê">Carnê</option>
                                <option value="Permuta">Permuta</option>
                            </select>
                        </div>
                        {/* Valor */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Valor</label>
                            <input name="VALOR" inputMode="numeric" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.VALOR} onChange={handleChange} maxLength={20} />
                        </div>
                        {/* Parcelas */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Parcelas</label>
                            <input
                                name="QUANTIDADE_PARCELA"
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={form.QUANTIDADE_PARCELA}
                                onChange={handleChange}
                                disabled={form.FORMA_PAG !== "Crédito"}
                            />
                        </div>
                        {/* Valor Pago */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Valor Pago</label>
                            <input name="ENTRADA" inputMode="numeric" className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none" value={form.ENTRADA} onChange={handleChange} maxLength={20} />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <button type="submit" className="px-5 py-2 font-semibold shadow rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors">Cadastrar O.S.</button>
                        <button type="button" className="px-5 py-2 font-semibold shadow rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ClienteCadastroOs;
