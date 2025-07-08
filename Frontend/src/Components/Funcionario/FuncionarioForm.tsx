import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const clinicasMock = [
    "Ótica Central",
    "Ótica Visão",
    "Ótica Popular"
];

const FuncionarioForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const funcionarioEdit = location.state?.funcionario;
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [otica, setOtica] = useState(clinicasMock[0]);
    const [isGerente, setIsGerente] = useState(false);
    const [msgSucesso, setMsgSucesso] = useState<string | null>(null);
    const [erros, setErros] = useState<{ nome?: string; telefone?: string }>({});
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    useEffect(() => {
        if (funcionarioEdit) {
            setNome(funcionarioEdit.nome || "");
            setTelefone(funcionarioEdit.telefone || "");
            setOtica(funcionarioEdit.otica || clinicasMock[0]);
            setIsGerente(!!funcionarioEdit.gerente);
        }
    }, [funcionarioEdit]);

    function handleTelefone(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 10) value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
        else if (value.length > 9) value = value.replace(/(\d{4})(\d{4})$/, "$1-$2");
        setTelefone(value);
    }

    function validar() {
        const novoErros: typeof erros = {};
        if (!nome.trim()) novoErros.nome = "Nome obrigatório";
        if (!telefone.match(/^\(\d{2}\) \d{4,5}-\d{4}$/)) novoErros.telefone = "Telefone inválido";
        setErros(novoErros);
        return Object.keys(novoErros).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validar()) return;
        setMsgSucesso(funcionarioEdit ? "Funcionário editado com sucesso!" : "Funcionário cadastrado com sucesso!");
        setTimeout(() => {
            setMsgSucesso(null);
            navigate("/cadastro");
        }, 1500);
    }

    return (
        <section className="w-full min-h-[calc(100vh-80px)] flex bg-gray-50 dark:bg-gray-900 py-6 px-2 font-inter">
            {msgSucesso && (
                <div className="fixed left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg z-50 font-semibold text-center min-w-[220px] max-w-[90vw] bg-green-500 text-white" style={{ top: 88 }} role="alert" aria-live="assertive">{msgSucesso}</div>
            )}
            <form onSubmit={handleSubmit} className="w-full max-w-lg ml-0 md:ml-8 bg-transparent dark:bg-transparent rounded-none shadow-none p-0 flex flex-col gap-6 border-0" autoComplete="off">
                <div className="flex items-center gap-2 mb-2">
                    <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => navigate(-1)} aria-label="Voltar">
                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{funcionarioEdit ? "Editar Funcionário" : "Novo Funcionário"}</h2>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Nome completo</label>
                    <input type="text" className={`w-full px-3 py-2 rounded-lg border ${erros.nome ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={nome} onChange={e => setNome(e.target.value)} required />
                    {erros.nome && <span className="text-xs text-red-500">{erros.nome}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Telefone</label>
                    <input type="tel" className={`w-full px-3 py-2 rounded-lg border ${erros.telefone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={telefone} onChange={handleTelefone} maxLength={15} required inputMode="tel" placeholder="(99) 99999-9999" />
                    {erros.telefone && <span className="text-xs text-red-500">{erros.telefone}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Ótica</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400" value={otica} onChange={e => setOtica(e.target.value)} required>
                        {clinicasMock.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <span>Gerente</span>
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={isGerente} onChange={e => setIsGerente(e.target.checked)} />
                    </label>
                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow">Salvar</button>
                    <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded shadow" onClick={() => setShowCancelConfirm(true)}>Cancelar</button>
                </div>
            </form>
            {showCancelConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
                        <span className="text-gray-900 dark:text-white font-semibold mb-4">Deseja cancelar o cadastro?</span>
                        <div className="flex gap-4 mt-2">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => navigate('/cadastro')}>Sim, cancelar</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={() => setShowCancelConfirm(false)}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FuncionarioForm;
