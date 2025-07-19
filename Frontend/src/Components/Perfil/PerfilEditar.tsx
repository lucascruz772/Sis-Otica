import React, { useState, useRef } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Mock de dados do usuário
const mockUser = {
    nome: "João da Ótica",
    telefone: "(31) 91234-5678",
    otica: "Ótica Central",
    imagem: ""
};

const PerfilEditar: React.FC = () => {
    // const navigate = useNavigate();
    const { logout } = useAuth();
    const [nome, setNome] = useState(mockUser.nome);
    const [telefone, setTelefone] = useState(mockUser.telefone);
    const [otica, setOtica] = useState(mockUser.otica);
    const [preview, setPreview] = useState<string>(mockUser.imagem);
    const [msgSucesso, setMsgSucesso] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock: usuário logado é gerente?
    const usuarioLogadoEhGerente = true; // Troque para false para testar restrição
    const [isGerente, setIsGerente] = useState(true); // Mock: status atual do perfil

    // Máscara simples de telefone
    function handleTelefone(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 10) value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
        else if (value.length > 9) value = value.replace(/(\d{4})(\d{4})$/, "$1-$2");
        setTelefone(value);
    }

    function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    }

    function handleSalvar(e: React.FormEvent) {
        e.preventDefault();
        // Placeholder para futura integração
        setMsgSucesso("Perfil atualizado com sucesso!");
        setTimeout(() => {
            setMsgSucesso(null);
            window.history.back();
        }, 1800);
    }

    function handleCancelar() {
        window.history.back();
    }

    function handleSair() {
        logout();
        window.location.assign('/');
    }

    return (
        <section className="w-full min-h-[calc(100vh-80px)] flex bg-gray-50 dark:bg-gray-900 py-6 px-2 font-inter">
            {msgSucesso && (
                <div
                    className="fixed left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg z-50 font-semibold text-center min-w-[220px] max-w-[90vw] bg-green-500 text-white"
                    style={{ top: 88 }}
                    role="alert"
                    aria-live="assertive"
                >
                    {msgSucesso}
                </div>
            )}
            <form
                onSubmit={handleSalvar}
                className="w-full max-w-lg bg-transparent dark:bg-transparent rounded-none shadow-none p-0 flex flex-col gap-6"
                autoComplete="off"
            >
                <div className="flex items-center gap-2 mb-2">
                    <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={handleCancelar}
                        aria-label="Voltar"
                    >
                        <FaArrowLeft className="text-xl text-gray-700 dark:text-gray-200" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Perfil</h2>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview do perfil"
                                className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700 shadow"
                            />
                        ) : (
                            <FaUserCircle className="w-28 h-28 text-gray-300 dark:text-gray-600" />
                        )}
                        <button
                            type="button"
                            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => fileInputRef.current?.click()}
                            aria-label="Alterar imagem"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm-2 2h.01M7 17a2 2 0 104 0 2 2 0 00-4 0z" /></svg>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImagem}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Nome completo</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Telefone</label>
                    <input
                        type="tel"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={telefone}
                        onChange={handleTelefone}
                        maxLength={15}
                        required
                        inputMode="tel"
                        placeholder="(99) 99999-9999"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100">Ótica</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={otica}
                        onChange={e => setOtica(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <span>Gerente</span>
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={isGerente}
                            onChange={e => setIsGerente(e.target.checked)}
                            disabled={!usuarioLogadoEhGerente}
                        />
                        {!usuarioLogadoEhGerente && (
                            <span className="text-xs text-gray-400 ml-2">(Apenas gerente pode alterar)</span>
                        )}
                    </label>
                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
                    >
                        Salvar alterações
                    </button>
                    <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded shadow"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded shadow"
                        onClick={handleSair}
                    >
                        Sair
                    </button>
                </div>
            </form>
        </section>
    );
};

export default PerfilEditar;
