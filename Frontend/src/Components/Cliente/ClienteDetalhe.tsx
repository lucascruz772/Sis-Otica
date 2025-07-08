import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clientesMock } from "./clientesMock";
import { IMaskInput } from "react-imask";

const ClienteDetalhe: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const cliente = clientesMock.find((c) => c.id === Number(id));
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState(cliente ? { ...cliente } : {
        id: 0,
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        dataNascimento: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: ""
    });
    const [mensagem, setMensagem] = useState("");

    // Atualiza o form sempre que o cliente mudar (ex: navegação entre clientes)
    useEffect(() => {
        if (cliente) {
            setForm({ ...cliente });
        }
    }, [cliente]);

    if (!cliente) {
        return <div className="p-8 text-center text-gray-500 dark:text-gray-300">Cliente não encontrado.</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSalvar = (e: React.FormEvent) => {
        e.preventDefault();
        setEditando(false);
        setMensagem("Dados do cliente atualizados com sucesso!");
        setTimeout(() => setMensagem(""), 4000);
    };

    return (
        <section className="w-full min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 transition-colors px-2 sm:px-4 py-6 relative">
            {/* Mensagem fixa no topo, sem mover o conteúdo */}
            <div className="fixed left-0 right-0 top-[80px] z-50 flex justify-center pointer-events-none">
                {mensagem && (
                    <div className="px-4 py-3 rounded-lg bg-green-100 border border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200 shadow-lg transition-all animate-fade-in pointer-events-auto">
                        {mensagem}
                    </div>
                )}
            </div>
            <div className="w-full max-w-2xl ml-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-900 dark:text-white text-left">Dados do Cliente</h2>
                <form onSubmit={handleSalvar} className="space-y-6">
                    {/* Dados */}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-4">Dados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                disabled={!editando}
                                readOnly={!editando}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="dataNascimento">Data Nascimento</label>
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                value={form.dataNascimento}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                disabled={!editando}
                                readOnly={!editando}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="cpf">CPF</label>
                            {editando ? (
                                <IMaskInput
                                    mask="000.000.000-00"
                                    value={form.cpf}
                                    name="cpf"
                                    id="cpf"
                                    onAccept={(value) => handleChange({ target: { name: 'cpf', value: value as string } })}
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                    disabled={!editando}
                                />
                            ) : (
                                <IMaskInput
                                    mask="000.000.000-00"
                                    value={form.cpf}
                                    name="cpf"
                                    id="cpf"
                                    className="w-full border rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed"
                                    disabled
                                    readOnly
                                />
                            )}
                        </div>
                    </div>
                    {/* Contato */}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-6">Contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="telefone">Telefone</label>
                            {editando ? (
                                <IMaskInput
                                    mask="(00) 00000-0000"
                                    value={form.telefone}
                                    name="telefone"
                                    id="telefone"
                                    onAccept={(value) => handleChange({ target: { name: 'telefone', value: value as string } })}
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                    disabled={!editando}
                                />
                            ) : (
                                <IMaskInput
                                    mask="(00) 00000-0000"
                                    value={form.telefone}
                                    name="telefone"
                                    id="telefone"
                                    className="w-full border rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed"
                                    disabled
                                    readOnly
                                />
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                disabled={!editando}
                                readOnly={!editando}
                            />
                        </div>
                    </div>
                    {/* Endereço */}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-6">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="cep">CEP</label>
                            {editando ? (
                                <IMaskInput
                                    mask="00000-000"
                                    value={form.cep}
                                    name="cep"
                                    id="cep"
                                    onAccept={(value) => handleChange({ target: { name: 'cep', value: value as string } })}
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                    disabled={!editando}
                                />
                            ) : (
                                <IMaskInput
                                    mask="00000-000"
                                    value={form.cep}
                                    name="cep"
                                    id="cep"
                                    className="w-full border rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed"
                                    disabled
                                    readOnly
                                />
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="logradouro">Logradouro</label>
                            <input
                                type="text"
                                id="logradouro"
                                name="logradouro"
                                value={form.logradouro}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                disabled={!editando}
                                readOnly={!editando}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="numero">Número</label>
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                disabled={!editando}
                                readOnly={!editando}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="bairro">Bairro</label>
                            <input
                                type="text"
                                id="bairro"
                                name="bairro"
                                value={form.bairro}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                disabled={!editando}
                                readOnly={!editando}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="cidade">Cidade</label>
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                value={form.cidade}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${editando ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 cursor-not-allowed'}`}
                                disabled={!editando}
                                readOnly={!editando}
                            />
                        </div>
                    </div>
                    {/* Botões */}
                    <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4 mt-4 sm:mt-6 w-full">
                        {editando ? (
                            <>
                                <button type="submit" className="px-4 sm:px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition w-full sm:w-auto min-w-[120px]">Salvar</button>
                                <button type="button" onClick={() => { setEditando(false); if (cliente) setForm({ ...cliente }); }} className="px-4 sm:px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full sm:w-auto min-w-[120px]">Cancelar</button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setEditando(true)} className="px-4 sm:px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition w-full sm:w-auto min-w-[120px]">Editar</button>
                        )}
                        <button type="button" onClick={() => navigate("/clientes")}
                            className="px-4 sm:px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full sm:w-auto min-w-[120px]">
                            Voltar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ClienteDetalhe;
