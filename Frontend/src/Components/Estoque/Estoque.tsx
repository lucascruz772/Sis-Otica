import React, { useState } from "react";

const Estoque: React.FC = () => {
    // Estados para formulário
    const [form, setForm] = useState({
        chavenfe: "",
        nome: "",
        fornecedor: "",
        tipo: "",
        estilo: "",
        preco_unitario: "",
        preco_venda: "",
        quantidade: "",
        quantidade_minima: "",
        tipo_unitario: "",
        importado: false,
        conferido: false,
    });
    // Placeholders para selects
    const fornecedores = ["Fornecedor 1", "Fornecedor 2"];
    const tipos = ["Tipo 1", "Tipo 2"];
    const estilos = ["Estilo 1", "Estilo 2"];
    const unitarios = ["Unidade 1", "Unidade 2"];
    // Placeholder para função do usuário
    const userFuncao = "G"; // "G" para gerente, "V" para vendedor, etc.
    // Tipagem explícita para mensagens
    const messages: string[] = [];
    // Placeholder para produtos e paginação
    const produtos = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, nome: `Produto ${i + 1}` })); // Exemplo
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;
    const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
    const produtosPagina = produtos.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você faria o POST para a API
        alert("Produto cadastrado (mock)");
    };

    return (
        <div className="container mx-auto py-4 px-4 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Mensagens de alerta */}
                {messages.length > 0 && (
                    <div className="mb-4">
                        {messages.map((msg, i) => (
                            <div key={i} className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                                <p>{msg}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Botões de ação (apenas gerente) */}
                {userFuncao === "G" && (
                    <div className="flex flex-wrap gap-2 justify-end mb-4">
                        <a href="/fornecedores" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Fornecedores
                        </a>
                        <a href="/tipos" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Tipos</a>
                        <a href="/estilos" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Estilos</a>
                        <a href="/tipos-unitarios" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Tipos Und</a>
                        <a href="/relatorio_estoque_conferido" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" target="_blank">Baixar Relatório Conferência</a>
                    </div>
                )}
                {/* Formulário de cadastro */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Chave NF</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="chavenfe" value={form.chavenfe} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Nome</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="nome" value={form.nome} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Fornecedor</label>
                            <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="fornecedor" value={form.fornecedor} onChange={handleChange}>
                                <option value="">Fornecedor...</option>
                                {fornecedores.map((f, i) => <option key={i} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Tipo</label>
                            <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="tipo" value={form.tipo} onChange={handleChange}>
                                <option value="">Tipo...</option>
                                {tipos.map((t, i) => <option key={i} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Estilo</label>
                            <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="estilo" value={form.estilo} onChange={handleChange}>
                                <option value="">Estilo...</option>
                                {estilos.map((e, i) => <option key={i} value={e}>{e}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Preço unitário</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="preco_unitario" value={form.preco_unitario} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Preço venda</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="preco_venda" value={form.preco_venda} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Quantidade</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="quantidade" value={form.quantidade} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Quantidade mínima</label>
                            <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="quantidade_minima" value={form.quantidade_minima} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Tipo Unitário</label>
                            <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="tipo_unitario" value={form.tipo_unitario} onChange={handleChange}>
                                <option value="">Unitário</option>
                                {unitarios.map((u, i) => <option key={i} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row gap-4">
                        <label className="inline-flex items-center cursor-pointer select-none">
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600 dark:checked:border-blue-600 focus:ring-blue-500"
                                type="checkbox"
                                name="importado"
                                checked={form.importado}
                                onChange={handleChange}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Importado</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer select-none">
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600 dark:checked:border-blue-600 focus:ring-blue-500"
                                type="checkbox"
                                name="conferido"
                                checked={form.conferido}
                                onChange={handleChange}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Conferido</span>
                        </label>
                    </div>
                    {userFuncao === "G" && (
                        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cadastrar</button>
                    )}
                </form>
                <hr className="my-4" />
                {/* Lista de produtos */}
                <div id="list-products" className="mb-3">
                    <div className="mb-2 text-gray-700 dark:text-gray-300">Quantidade <span className="bg-green-500 text-white px-2 py-1 rounded">{produtos.length}</span></div>
                    {produtosPagina.length > 0 ? (
                        <ul className="bg-gray-100 dark:bg-gray-800 rounded p-3 text-gray-900 dark:text-gray-200">
                            {produtosPagina.map((p) => (
                                <li key={p.id} className="py-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0">{p.nome}</li>
                            ))}
                        </ul>
                    ) : (
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 text-center text-gray-500 dark:text-gray-400">Lista de produtos será exibida aqui.</div>
                    )}
                </div>
                {/* Paginação */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" disabled={paginaAtual === 1} onClick={() => setPaginaAtual(paginaAtual - 1)}>{'<'}</button>
                    <span className="text-gray-700 dark:text-gray-300">{paginaAtual} de {totalPaginas}</span>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" disabled={paginaAtual === totalPaginas} onClick={() => setPaginaAtual(paginaAtual + 1)}>{'>'}</button>
                </div>
            </div>
        </div>
    );
};

export default Estoque;