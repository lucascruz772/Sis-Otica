import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";

const ClienteCadastro: React.FC = () => {
    const [form, setForm] = useState({
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
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Cliente cadastrado com sucesso!");
        navigate("/clientes");
    };

    return (
        <section className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors px-2 sm:px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl mt-4 sm:mt-8 ml-0 text-gray-900 dark:text-white space-y-6"
                autoComplete="off"
            >
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-900 dark:text-white text-left">Cadastro de Cliente</h2>
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
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Ex: João"
                            required
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
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="cpf">CPF</label>
                        <IMaskInput
                            mask="000.000.000-00"
                            value={form.cpf}
                            name="cpf"
                            id="cpf"
                            onAccept={(value) => handleChange({ target: { name: 'cpf', value: value as string } })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="000.000.000-00"
                            required
                        />
                    </div>
                </div>
                {/* Contato */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-6">Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="telefone">Telefone</label>
                        <IMaskInput
                            mask="(00) 00000-0000"
                            value={form.telefone}
                            name="telefone"
                            id="telefone"
                            onAccept={(value) => handleChange({ target: { name: 'telefone', value: value as string } })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Email"
                            required
                        />
                    </div>
                </div>
                {/* Endereço */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-6">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="cep">CEP</label>
                        <IMaskInput
                            mask="00000-000"
                            value={form.cep}
                            name="cep"
                            id="cep"
                            onAccept={(value) => handleChange({ target: { name: 'cep', value: value as string } })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="CEP"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="logradouro">Logradouro</label>
                        <input
                            type="text"
                            id="logradouro"
                            name="logradouro"
                            value={form.logradouro}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Rua"
                            required
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
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Número"
                            required
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
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Bairro"
                            required
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
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="Cidade"
                            required
                        />
                    </div>
                </div>
                {/* Botões responsivos: largura total no mobile, inline no desktop */}
                <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4 mt-4 sm:mt-6 w-full">
                    <button
                        type="submit"
                        className="px-4 sm:px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition w-full sm:w-auto min-w-[120px]"
                    >
                        Salvar
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/clientes")}
                        className="px-4 sm:px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full sm:w-auto min-w-[120px]"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ClienteCadastro;