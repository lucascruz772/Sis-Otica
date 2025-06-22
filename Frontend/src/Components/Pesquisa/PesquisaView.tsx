import React from "react";
import { Link } from "react-router-dom";

// Tipos para os dados da OS
interface Cliente {
    id: number;
    nome: string;
}

interface Vendedor {
    first_name: string;
}

interface VisualizarOS {
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
    return (
        <section className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col items-center py-10 px-0 overflow-x-auto">
            <nav aria-label="breadcrumb" className="w-full px-4 md:px-8 mb-8">
                <ol className="flex flex-wrap gap-2 text-base font-medium text-blue-700/80 dark:text-blue-200">
                    <li>
                        <Link to="/" className="hover:text-blue-900 dark:hover:text-white transition-colors">Página Principal</Link>
                    </li>
                    <li className="text-blue-300 dark:text-blue-700">/</li>
                    <li>
                        <Link to="/os" className="hover:text-blue-900 dark:hover:text-white transition-colors">Listar O.S</Link>
                    </li>
                    <li className="text-blue-300 dark:text-blue-700">/</li>
                    <li className="text-blue-900 dark:text-white font-semibold">Visualizar O.S</li>
                    <li className="text-blue-300 dark:text-blue-700">/</li>
                    <li>
                        <Link to={`/os/historico/${VISUALIZAR_OS.id}`} className="hover:text-blue-900 dark:hover:text-white transition-colors">Histórico</Link>
                    </li>
                </ol>
            </nav>

            <div className="w-full px-2 md:px-10">
                {messages.length > 0 && (
                    <div className="mb-6 space-y-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-4 rounded-xl border ${
                                    msg.tags === "error"
                                        ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700"
                                        : "bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700"
                                }`}
                            >
                                {msg.message}
                            </div>
                        ))}
                    </div>
                )}

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
                        {unidade}{VISUALIZAR_OS.id}
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

                    {/* Grid responsivo, sem card, ocupando toda a largura */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {/* Data Pedido */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Data Pedido</label>
                            <div className="bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700">
                                {new Date(VISUALIZAR_OS.DATA_SOLICITACAO).toLocaleDateString()}
                            </div>
                        </div>
                        {/* Previsão Entrega */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Previsão Entrega</label>
                            <div className="bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700">
                                {new Date(VISUALIZAR_OS.PREVISAO_ENTREGA).toLocaleDateString()}
                            </div>
                        </div>
                        {/* Vendedor */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Vendedor</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.VENDEDOR.first_name}
                            />
                        </div>
                        {/* Cliente */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Cliente</label>
                            <Link
                                to={`/cliente/${typeof VISUALIZAR_OS.CLIENTE === 'object' ? VISUALIZAR_OS.CLIENTE.id : ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <input
                                    readOnly
                                    className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                    value={typeof VISUALIZAR_OS.CLIENTE === 'object' ? VISUALIZAR_OS.CLIENTE.nome : VISUALIZAR_OS.CLIENTE}
                                />
                            </Link>
                        </div>
                        {/* Tipo de Serviço */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Tipo de Serviço</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.SERVICO}
                            />
                        </div>
                        {/* Laboratório */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Laboratório</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.LABORATORIO}
                            />
                        </div>
                        {/* OD/ OE/ AD/ DNP/ P/ DPA/ DIAG/ V/ H/ ALT/ ARM */}
                        { [
                            { label: "OD - ESF", value: VISUALIZAR_OS.OD_ESF },
                            { label: "OD - CIL", value: VISUALIZAR_OS.OD_CIL },
                            { label: "OD - EIXO", value: VISUALIZAR_OS.OD_EIXO },
                            { label: "OE - ESF", value: VISUALIZAR_OS.OE_ESF },
                            { label: "OE - CIL", value: VISUALIZAR_OS.OE_CIL },
                            { label: "OE - EIXO", value: VISUALIZAR_OS.OE_EIXO },
                            { label: "AD", value: VISUALIZAR_OS.AD },
                            { label: "DNP", value: VISUALIZAR_OS.DNP },
                            { label: "P", value: VISUALIZAR_OS.P },
                            { label: "DPA", value: VISUALIZAR_OS.DPA },
                            { label: "DIAG", value: VISUALIZAR_OS.DIAG },
                            { label: "V", value: VISUALIZAR_OS.V },
                            { label: "H", value: VISUALIZAR_OS.H },
                            { label: "ALT", value: VISUALIZAR_OS.ALT },
                            { label: "ARM", value: VISUALIZAR_OS.ARM }
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">{label}</label>
                                <input
                                    readOnly
                                    className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                    value={value}
                                />
                            </div>
                        ))}
                        {/* Montagem */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Montagem</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.MONTAGEM}
                            />
                        </div>
                        {/* Lentes */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Lentes</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.LENTES}
                            />
                        </div>
                        {/* Armação */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Armação</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.ARMACAO}
                            />
                        </div>
                        {/* Observação */}
                        <div className="sm:col-span-2 md:col-span-4">
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Observação</label>
                            <textarea
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none resize-none"
                                rows={3}
                                value={VISUALIZAR_OS.OBSERVACAO}
                            />
                        </div>
                        {/* Pagamento */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Pagamento</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={formaPagLabels[VISUALIZAR_OS.FORMA_PAG] || "-"}
                            />
                        </div>
                        {/* Valor */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Valor</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.VALOR}
                            />
                        </div>
                        {/* Parcelas */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Parcelas</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.QUANTIDADE_PARCELA + "x"}
                            />
                        </div>
                        {/* Valor Pago */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Valor Pago</label>
                            <input
                                readOnly
                                className="w-full bg-blue-50 dark:bg-gray-800 rounded-lg px-3 py-2 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-gray-700 focus:outline-none"
                                value={VISUALIZAR_OS.ENTRADA}
                            />
                        </div>
                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Status</label>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow ${statusLabels[VISUALIZAR_OS.STATUS]?.className || "bg-gray-300 text-gray-800"}`}>
                                {statusLabels[VISUALIZAR_OS.STATUS]?.label || "-"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <button type="button" className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-lg opacity-60 cursor-not-allowed font-semibold shadow" disabled>Editar</button>
                        <button type="button" className="px-5 py-2 bg-yellow-400 dark:bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 dark:hover:bg-yellow-700 transition-colors font-semibold shadow">Imprimir</button>
                        <button type="button" className="px-5 py-2 bg-blue-700 dark:bg-blue-900 text-white rounded-lg hover:bg-blue-800 dark:hover:bg-blue-950 transition-colors font-semibold shadow">Finalizar</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Exemplo de uso com dados mockados
const mockOS: VisualizarOS = {
    id: 123,
    DATA_SOLICITACAO: "2025-06-20T00:00:00Z",
    PREVISAO_ENTREGA: "2025-06-25T00:00:00Z",
    VENDEDOR: { first_name: "João" },
    CLIENTE: { id: 1, nome: "Maria Silva" },
    SERVICO: "Troca de Lente",
    LABORATORIO: "LabX",
    OD_ESF: "-1.00",
    OD_CIL: "-0.50",
    OD_EIXO: "90",
    OE_ESF: "-1.25",
    OE_CIL: "-0.75",
    OE_EIXO: "80",
    AD: "+2.00",
    DNP: "32",
    P: "62",
    DPA: "30",
    DIAG: "12",
    V: "14",
    H: "16",
    ALT: "18",
    ARM: "20",
    MONTAGEM: "Completa",
    LENTES: "Crizal",
    ARMACAO: "Ray-Ban",
    OBSERVACAO: "Cliente pediu urgência.",
    FORMA_PAG: "A",
    VALOR: "R$ 500,00",
    QUANTIDADE_PARCELA: 1,
    ENTRADA: "R$ 500,00",
    STATUS: "A",
};

const PesquisaView: React.FC = () => {
    return <OsView unidade="Unidade 1 - " VISUALIZAR_OS={mockOS} />;
};

export default PesquisaView;