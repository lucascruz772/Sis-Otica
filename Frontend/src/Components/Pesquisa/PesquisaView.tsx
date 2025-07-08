import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from '../ui/Button';

// Tipos para os dados da OS
export interface Cliente {
    id: number;
    nome: string;
}

export interface Vendedor {
    first_name: string;
}

export interface VisualizarOS {
    id: number;
    solicitar_avaliacao?: boolean;
    ANEXO?: { url: string };
    ASSINATURA?: { url: string };
    DATA_SOLICITACAO: string;
    PREVISAO_ENTREGA: string;
    VENDEDOR: Vendedor;
    CLIENTE: Cliente | string;
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
    QUANTIDADE_PARCELA: number;
    ENTRADA: string;
    STATUS: string;
}

interface OsViewProps {
    unidade?: string;
    VISUALIZAR_OS: VisualizarOS;
    messages?: { tags: string; message: string }[];
}

const statusLabels: Record<string, { label: string; className: string }> = {
    A: { label: "Solicitado", className: "bg-gray-500 text-white" },
    E: { label: "Entregue", className: "bg-green-500 text-white" },
    C: { label: "Cancelado", className: "bg-red-500 text-white" },
    L: { label: "Laboratório", className: "bg-blue-500 text-white" },
    J: { label: "Loja", className: "bg-yellow-500 text-gray-900" },
};

const formaPagLabels: Record<string, string> = {
    A: "Pix",
    B: "Dinheiro",
    C: "Débito",
    D: "Crédito",
    E: "Carnê",
    F: "Permuta",
};

const OsView: React.FC<OsViewProps> = ({ unidade = "", VISUALIZAR_OS, messages = [] }) => {
    const [editMode, setEditMode] = React.useState(false);
    const [osData, setOsData] = React.useState({ ...VISUALIZAR_OS });
    const [showMsg, setShowMsg] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        setOsData({ ...VISUALIZAR_OS });
    }, [VISUALIZAR_OS]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setOsData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSave() {
        setEditMode(false);
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 2500);
    }

    function handleCancelEdit() {
        setEditMode(false);
        setOsData({ ...VISUALIZAR_OS });
    }

    // Utilitário para garantir data local no input type=date
    function toLocalDateInputValue(dateStr: string) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISO = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
        return localISO;
    }

    return (
        <section className="min-h-screen w-full min-w-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col items-center py-10 px-2 sm:px-4 md:px-8">
            <div className="w-full px-2 md:px-10">
                {/* Botão Voltar */}
                <div className="mb-4 flex justify-start">
                    <Button type="button" variant="outline" className="px-4 py-2 font-semibold shadow" onClick={() => navigate(-1)}>
                        ← Voltar
                    </Button>
                </div>
                {/* Toast de sucesso fixo, nunca empurra o layout */}
                {showMsg && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl border bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700 text-center font-semibold shadow-lg min-w-[220px] max-w-[90vw]">
                        Dados salvos com sucesso!
                    </div>
                )}
                {/* Mensagens do backend */}
                {messages.length > 0 && (
                    <div className="mb-6 space-y-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-4 rounded-xl border ${msg.tags === "error"
                                    ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700"
                                    : "bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700"
                                    }`}
                            >
                                {msg.message}
                            </div>
                        ))}
                    </div>
                )}
                {/* Avaliação */}
                {VISUALIZAR_OS.solicitar_avaliacao && (
                    <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 p-4 rounded-xl flex items-center gap-2 shadow-sm dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700">
                        <span className="text-xl">⚠️</span>
                        <p>
                            Como foi a experiência com esse cliente?{" "}
                            <Link
                                to={`/cliente/avaliar/${typeof VISUALIZAR_OS.CLIENTE === 'object' ? VISUALIZAR_OS.CLIENTE.id : ''}`}
                                className="font-semibold text-yellow-900 underline hover:text-yellow-700 dark:text-yellow-200 dark:hover:text-yellow-100"
                            >
                                Clique aqui para avaliar
                            </Link>.
                        </p>
                    </div>
                )}
                <div className="space-y-10">
                    <h1 className="text-4xl font-extrabold text-center text-blue-800 dark:text-white tracking-tight drop-shadow mb-8">
                        {unidade}{osData.id}
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {VISUALIZAR_OS.ANEXO && (
                            <a
                                href={VISUALIZAR_OS.ANEXO.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium shadow dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                            >
                                Visualizar Anexo
                            </a>
                        )}
                        {VISUALIZAR_OS.ASSINATURA && (
                            <a
                                href={VISUALIZAR_OS.ASSINATURA.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium shadow dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                            >
                                Visualizar Assinatura
                            </a>
                        )}
                    </div>

                    {/* Agrupamento e títulos das seções */}
                    <div className="space-y-8 w-full">
                        {/* Seção Venda */}
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-4 border-b border-blue-200 dark:border-blue-800 pb-1">Venda</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Data Pedido */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Data Pedido</label>
                                    {editMode ? (
                                        <input
                                            name="DATA_SOLICITACAO"
                                            type="date"
                                            className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                            value={toLocalDateInputValue(osData.DATA_SOLICITACAO)}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <div className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700">
                                            {new Date(osData.DATA_SOLICITACAO).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                                {/* Previsão Entrega */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Previsão Entrega</label>
                                    {editMode ? (
                                        <input
                                            name="PREVISAO_ENTREGA"
                                            type="date"
                                            className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                            value={toLocalDateInputValue(osData.PREVISAO_ENTREGA)}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <div className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700">
                                            {new Date(osData.PREVISAO_ENTREGA).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                                {/* Vendedor */}
                                <div>
                                    <label htmlFor="vendedor-input" className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Vendedor</label>
                                    <input
                                        id="vendedor-input"
                                        name="VENDEDOR"
                                        readOnly
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.VENDEDOR.first_name}
                                    />
                                </div>
                                {/* Cliente */}
                                <div>
                                    <label htmlFor="cliente-input" className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Cliente</label>
                                    <Link
                                        to={`/cliente/${typeof osData.CLIENTE === 'object' ? osData.CLIENTE.id : ''}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <input
                                            id="cliente-input"
                                            name="CLIENTE"
                                            readOnly
                                            className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                            value={typeof osData.CLIENTE === 'object' ? osData.CLIENTE.nome : osData.CLIENTE}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Seção Serviço */}
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-4 border-b border-blue-200 dark:border-blue-800 pb-1">Serviço</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Tipo de Serviço */}
                                <div>
                                    <label htmlFor="servico-input" className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Tipo de Serviço</label>
                                    <input
                                        id="servico-input"
                                        name="SERVICO"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.SERVICO}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Laboratório */}
                                <div>
                                    <label htmlFor="laboratorio-input" className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Laboratório</label>
                                    <input
                                        id="laboratorio-input"
                                        name="LABORATORIO"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.LABORATORIO}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Seção Lentes */}
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-4 border-b border-blue-200 dark:border-blue-800 pb-1">Lentes</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* OD/ OE/ AD/ DNP/ P/ DPA/ DIAG/ V/ H/ ALT/ ARM */}
                                {[
                                    { label: "OD - ESF", name: "OD_ESF", value: osData.OD_ESF },
                                    { label: "OD - CIL", name: "OD_CIL", value: osData.OD_CIL },
                                    { label: "OD - EIXO", name: "OD_EIXO", value: osData.OD_EIXO },
                                    { label: "OE - ESF", name: "OE_ESF", value: osData.OE_ESF },
                                    { label: "OE - CIL", name: "OE_CIL", value: osData.OE_CIL },
                                    { label: "OE - EIXO", name: "OE_EIXO", value: osData.OE_EIXO },
                                    { label: "AD", name: "AD", value: osData.AD },
                                    { label: "DNP", name: "DNP", value: osData.DNP },
                                    { label: "P", name: "P", value: osData.P },
                                    { label: "DPA", name: "DPA", value: osData.DPA },
                                    { label: "DIAG", name: "DIAG", value: osData.DIAG },
                                    { label: "V", name: "V", value: osData.V },
                                    { label: "H", name: "H", value: osData.H },
                                    { label: "ALT", name: "ALT", value: osData.ALT },
                                    { label: "ARM", name: "ARM", value: osData.ARM }
                                ].map(({ label, name, value }) => (
                                    <div key={label}>
                                        <label htmlFor={`input-${label.replace(/\s|\W/g, '').toLowerCase()}`} className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">{label}</label>
                                        <input
                                            id={`input-${label.replace(/\s|\W/g, '').toLowerCase()}`}
                                            name={name}
                                            readOnly={!editMode}
                                            className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                            value={value}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Seção Montagem, Lentes, Armação */}
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-4 border-b border-blue-200 dark:border-blue-800 pb-1">Montagem, Lentes e Armação</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Montagem */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Montagem</label>
                                    <input
                                        name="MONTAGEM"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.MONTAGEM}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Lentes */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Lentes</label>
                                    <input
                                        name="LENTES"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.LENTES}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Armação */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Armação</label>
                                    <input
                                        name="ARMACAO"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.ARMACAO}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Seção Observação */}
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-4 border-b border-blue-200 dark:border-blue-800 pb-1">Observação</h2>
                            <div className="grid grid-cols-1">
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Observação</label>
                                    <textarea
                                        name="OBSERVACAO"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none resize-none"
                                        rows={3}
                                        value={osData.OBSERVACAO}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Seção Financeiro */}
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-4 border-b border-blue-200 dark:border-blue-800 pb-1">Financeiro</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Pagamento */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Pagamento</label>
                                    <input
                                        name="FORMA_PAG"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={editMode ? osData.FORMA_PAG : (formaPagLabels[osData.FORMA_PAG] || "-")}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Valor */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Valor</label>
                                    <input
                                        name="VALOR"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.VALOR}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Parcelas */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Parcelas</label>
                                    <input
                                        name="QUANTIDADE_PARCELA"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.QUANTIDADE_PARCELA + "x"}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Valor Pago */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Valor Pago</label>
                                    <input
                                        name="ENTRADA"
                                        readOnly={!editMode}
                                        className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                        value={osData.ENTRADA}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Status</label>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow ${statusLabels[osData.STATUS]?.className || "bg-gray-300 text-gray-800"}`}>
                                        {statusLabels[osData.STATUS]?.label || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ...botoes... */}
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        {!editMode ? (
                            <Button type="button" variant="outline" className="px-5 py-2 font-semibold shadow" onClick={() => setEditMode(true)}>Editar</Button>
                        ) : (
                            <>
                                <Button type="button" variant="primary" className="px-5 py-2 font-semibold shadow" onClick={handleSave}>Salvar</Button>
                                <Button type="button" variant="outline" className="px-5 py-2 font-semibold shadow" onClick={handleCancelEdit}>Cancelar</Button>
                            </>
                        )}
                        <Button type="button" variant="danger" className="px-5 py-2 bg-yellow-400 dark:bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 dark:hover:bg-yellow-700 transition-colors font-semibold shadow">Imprimir</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OsView;