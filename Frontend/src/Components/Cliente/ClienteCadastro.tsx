import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Cliente cadastrado com sucesso!");
        navigate("/clientes");
    };

    return (
        <section className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl py-8 px-4 md:px-8 w-full space-y-6 text-gray-900 dark:text-white mt-8"
                autoComplete="off"
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-left">Cadastro de Cliente</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="telefone">Telefone</label>
                        <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={form.cpf}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            placeholder="000.000.000-00"
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
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white" htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={form.cep}
                            onChange={handleChange}
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
                <div className="flex justify-start gap-4 mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Salvar
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/clientes")}
                        className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ClienteCadastro;