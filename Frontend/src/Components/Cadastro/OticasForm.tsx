import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOticaLogo } from '../../hooks/useOticaLogo';

export const OticasForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const oticaEdit = location.state?.otica;
    const { setLogo } = useOticaLogo();
    const [nome, setNome] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [contato, setContato] = useState("");
    const [imagem, setImagem] = useState<string | null>(null);
    const [msgSucesso, setMsgSucesso] = useState<string | null>(null);
    const [erros, setErros] = useState<{ nome?: string; rua?: string; numero?: string; bairro?: string; cidade?: string; estado?: string; contato?: string }>({});
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (oticaEdit) {
            setNome(oticaEdit.nome || "");
            setRua(oticaEdit.rua || "");
            setNumero(oticaEdit.numero || "");
            setBairro(oticaEdit.bairro || "");
            setCidade(oticaEdit.cidade || "");
            setEstado(oticaEdit.estado || "");
            setContato(oticaEdit.contato || "");
            // Não carrega imagem por padrão (mock), mas pode ser expandido
        }
    }, [oticaEdit]);

    function handleContato(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 10) value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
        else if (value.length > 9) value = value.replace(/(\d{4})(\d{4})$/, "$1-$2");
        setContato(value);
    }

    function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagem(reader.result as string);
                setLogo(reader.result as string); // Atualiza logo global
            };
            reader.readAsDataURL(file);
        }
    }

    function validar() {
        const novoErros: typeof erros = {};
        if (!nome.trim()) novoErros.nome = "Nome obrigatório";
        if (!rua.trim()) novoErros.rua = "Rua obrigatória";
        if (!numero.trim()) novoErros.numero = "Número obrigatório";
        if (!bairro.trim()) novoErros.bairro = "Bairro obrigatório";
        if (!cidade.trim()) novoErros.cidade = "Cidade obrigatória";
        if (!estado.trim()) novoErros.estado = "Estado obrigatório";
        if (!contato.match(/^(\(\d{2}\) \d{4,5}-\d{4})$/)) novoErros.contato = "Contato inválido";
        setErros(novoErros);
        return Object.keys(novoErros).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validar()) return;
        setMsgSucesso(oticaEdit ? "Ótica editada com sucesso!" : "Ótica cadastrada com sucesso!");
        setLogo(imagem); // Agora salva a logo para a ótica ativa (nome da ótica do usuário)
        // --- Integração futura com API REST ---
        // const payload = {
        //     nome,
        //     rua,
        //     numero,
        //     bairro,
        //     cidade,
        //     estado,
        //     contato,
        //     imagem // base64 ou url
        // };
        // if (oticaEdit) {
        //     axios.put(`/api/oticas/${oticaEdit.id}`, payload)
        //         .then(() => setMsgSucesso("Ótica editada com sucesso!"));
        // } else {
        //     axios.post(`/api/oticas`, payload)
        //         .then(() => setMsgSucesso("Ótica cadastrada com sucesso!"));
        // }
        // ---------------------------------------
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
                <div className="flex items-center gap-4 mb-4">
                    <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => navigate(-1)} aria-label="Voltar">
                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {/* Imagem da ótica (logo ou preview) */}
                    <div className="flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                        {imagem ? (
                            <img src={imagem} alt="Logo da Ótica" className="object-cover w-full h-full" />
                        ) : (
                            <span className="text-gray-400 text-xs">Logo</span>
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{oticaEdit ? "Editar Ótica" : "Nova Ótica"}</h2>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Nome</label>
                    <input type="text" className={`w-full px-3 py-2 rounded-lg border ${erros.nome ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={nome} onChange={e => setNome(e.target.value)} required />
                    {erros.nome && <span className="text-xs text-red-500">{erros.nome}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Rua</label>
                    <input type="text" className={`w-full px-3 py-2 rounded-lg border ${erros.rua ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={rua} onChange={e => setRua(e.target.value)} required />
                    {erros.rua && <span className="text-xs text-red-500">{erros.rua}</span>}
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2 w-1/3">
                        <label className="font-semibold text-blue-900 dark:text-blue-100">Número</label>
                        <input type="text" className={`w-full px-3 py-2 rounded-lg border ${erros.numero ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={numero} onChange={e => setNumero(e.target.value)} required />
                        {erros.numero && <span className="text-xs text-red-500">{erros.numero}</span>}
                    </div>
                    <div className="flex flex-col gap-2 w-1/3">
                        <label className="font-semibold text-blue-900 dark:text-blue-100">Bairro</label>
                        <input type="text" className={`w-full px-3 py-2 rounded-lg border ${erros.bairro ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={bairro} onChange={e => setBairro(e.target.value)} required />
                        {erros.bairro && <span className="text-xs text-red-500">{erros.bairro}</span>}
                    </div>
                    <div className="flex flex-col gap-2 w-1/3">
                        <label className="font-semibold text-blue-900 dark:text-blue-100">Cidade</label>
                        <input type="text" className={`w-full px-3 py-2 rounded-lg border ${erros.cidade ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={cidade} onChange={e => setCidade(e.target.value)} required />
                        {erros.cidade && <span className="text-xs text-red-500">{erros.cidade}</span>}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Estado</label>
                    <input type="text" className={`w-full px-3 py-2 rounded-lg border ${erros.estado ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={estado} onChange={e => setEstado(e.target.value)} required />
                    {erros.estado && <span className="text-xs text-red-500">{erros.estado}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Contato</label>
                    <input type="tel" className={`w-full px-3 py-2 rounded-lg border ${erros.contato ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`} value={contato} onChange={handleContato} maxLength={15} required inputMode="tel" placeholder="(99) 99999-9999" />
                    {erros.contato && <span className="text-xs text-red-500">{erros.contato}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Foto</label>
                    <div className="flex items-center gap-4">
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImagem} />
                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => fileInputRef.current?.click()}>Selecionar Imagem</button>
                    </div>
                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow">{oticaEdit ? "Salvar Alterações" : "Salvar"}</button>
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

export default OticasForm;
