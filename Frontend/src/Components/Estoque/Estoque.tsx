import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

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
    // Placeholder para produtos
    const produtos = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, nome: `Produto ${i + 1}` })); // Exemplo

    // Estado para controle do modal de exclusão
    const [deleteId, setDeleteId] = useState<number | null>(null);
    // Mensagem de feedback
    const [mensagem, setMensagem] = useState<string>("");
    const [mensagemTipo, setMensagemTipo] = useState<'sucesso' | 'erro' | ''>("");

    // Edição inline
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");

    // Estado para pesquisa
    const [busca, setBusca] = useState("");
    const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));

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

    // Funções de exclusão
    const handleDelete = (id: number) => {
        setDeleteId(id);
    };
    const confirmDelete = () => {
        // Aqui você faria a exclusão real na API
        setDeleteId(null);
        setMensagem("Produto excluído com sucesso!");
        setMensagemTipo('sucesso');
        setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
    };
    const cancelDelete = () => {
        setDeleteId(null);
    };

    // Funções de edição
    const handleEdit = (produto: { id: number; nome: string }) => {
        setEditId(produto.id);
        setEditNome(produto.nome);
    };
    const handleEditSave = (id: number) => {
        if (!editNome.trim()) {
            setMensagem("O nome do produto não pode estar vazio!");
            setMensagemTipo('erro');
            setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
            return;
        }
        // Aqui você faria a atualização real na API
        // Como é mock, só atualiza localmente
        const idx = produtos.findIndex((p) => p.id === id);
        if (idx !== -1) {
            produtos[idx].nome = editNome;
        }
        setEditId(null);
        setMensagem("Produto atualizado com sucesso!");
        setMensagemTipo('sucesso');
        setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
    };
    const handleEditCancel = () => {
        setEditId(null);
        setEditNome("");
    };

    return (
        <div className="w-full min-w-0 px-2 py-2 bg-white dark:bg-gray-900 transition-colors duration-300 flex justify-start">
            <div className="w-auto max-w-3xl min-w-0">
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
                    <div className="flex flex-row flex-nowrap gap-2 justify-start mb-4 w-auto overflow-x-auto">
                        <a href="/fornecedores" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-base min-w-[90px] text-center whitespace-nowrap">Fornecedores</a>
                        <a href="/tipos" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-base min-w-[90px] text-center whitespace-nowrap">Tipos</a>
                        <a href="/estilos" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-base min-w-[90px] text-center whitespace-nowrap">Estilos</a>
                        <a href="/tipos-unitarios" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-base min-w-[90px] text-center whitespace-nowrap">Tipos Und</a>
                        <a href="/relatorio_estoque_conferido" className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-base min-w-[90px] text-center whitespace-nowrap" target="_blank">Baixar Relatório Conferência</a>
                    </div>
                )}
                {/* Formulário de cadastro */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded shadow p-3 mb-4 w-auto max-w-3xl">
                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Chave NF</label>
                            <Input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="chavenfe" value={form.chavenfe} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Nome</label>
                            <Input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="nome" value={form.nome} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Fornecedor</label>
                            <Select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="fornecedor" value={form.fornecedor} onChange={handleChange}>
                                <option value="">Fornecedor...</option>
                                {fornecedores.map((f, i) => <option key={i} value={f}>{f}</option>)}
                            </Select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Tipo</label>
                            <Select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="tipo" value={form.tipo} onChange={handleChange}>
                                <option value="">Tipo...</option>
                                {tipos.map((t, i) => <option key={i} value={t}>{t}</option>)}
                            </Select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Estilo</label>
                            <Select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="estilo" value={form.estilo} onChange={handleChange}>
                                <option value="">Estilo...</option>
                                {estilos.map((e, i) => <option key={i} value={e}>{e}</option>)}
                            </Select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Preço unitário</label>
                            <Input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="preco_unitario" value={form.preco_unitario} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Preço venda</label>
                            <Input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="preco_venda" value={form.preco_venda} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Quantidade</label>
                            <Input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="quantidade" value={form.quantidade} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Quantidade mínima</label>
                            <Input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="quantidade_minima" value={form.quantidade_minima} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Tipo Unitário</label>
                            <Select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" name="tipo_unitario" value={form.tipo_unitario} onChange={handleChange}>
                                <option value="">Unitário</option>
                                {unitarios.map((u, i) => <option key={i} value={u}>{u}</option>)}
                            </Select>
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
                {/* Estilo global para esconder scrollbar da lista de produtos */}
                <style>{`
                    #list-products-scroll::-webkit-scrollbar { display: none !important; }
                    #list-products-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
                `}</style>
                <div id="list-products" className="mb-3">
                    <div className="mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span>Quantidade <span className="bg-green-500 text-white px-2 py-1 rounded">{produtosFiltrados.length}</span></span>
                        <input
                            type="text"
                            placeholder="Pesquisar produto..."
                            className="ml-auto w-56 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring focus:border-blue-400"
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                            aria-label="Pesquisar produto"
                        />
                    </div>
                    {produtosFiltrados.length > 0 ? (
                        <div
                            id="list-products-scroll"
                            className="overflow-x-auto max-h-[280px] overflow-y-auto"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <table className="min-w-full max-w-full bg-gray-100 dark:bg-gray-800 rounded text-gray-900 dark:text-gray-200 text-xs">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-2 border-b text-left">N°</th>
                                        <th className="px-2 py-2 border-b text-left">Nome</th>
                                        <th className="px-2 py-2 border-b text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produtosFiltrados.map((p) => (
                                        <tr key={p.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-700 h-10">
                                            <td className="px-2 py-2 border-b">{p.id}</td>
                                            <td className="px-2 py-2 border-b">
                                                {editId === p.id ? (
                                                    <input
                                                        className="p-1 border rounded dark:bg-gray-700 dark:text-white"
                                                        value={editNome}
                                                        onChange={(e) => setEditNome(e.target.value)}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span>{p.nome}</span>
                                                )}
                                            </td>
                                            <td className="px-2 py-2 border-b text-center">
                                                {editId === p.id ? (
                                                    <>
                                                        <button className="text-green-600 hover:text-green-800 mr-2" onClick={() => handleEditSave(p.id)} title="Salvar" aria-label="Salvar edição"><FaCheck /></button>
                                                        <button className="text-red-600 hover:text-red-800" onClick={handleEditCancel} title="Cancelar" aria-label="Cancelar edição"><FaTimes /></button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => handleEdit(p)} title="Editar" aria-label="Editar produto"><FaEdit /></button>
                                                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(p.id)} title="Excluir" aria-label="Excluir produto"><FaTrash /></button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 text-center text-gray-500 dark:text-gray-400">Lista de produtos será exibida aqui.</div>
                    )}
                </div>
                {/* Mensagem fixa alinhada com a barra de pesquisa, levemente para a direita */}
                {mensagem && (
                    <div
                        className={`fixed z-50 px-3 py-1 rounded shadow text-sm font-medium text-left transition-opacity duration-300 ${mensagemTipo === 'sucesso' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                        style={{ left: 278, top: 104 }}
                    >
                        {mensagem}
                    </div>
                )}
                {/* Modal de confirmação de exclusão */}
                {deleteId !== null && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" role="dialog" aria-labelledby="modal-title">
                        <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-sm">
                            <h3 id="modal-title" className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Confirmar exclusão</h3>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">Deseja realmente excluir este produto?</p>
                            <div className="flex justify-end gap-2">
                                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={confirmDelete} aria-label="Confirmar exclusão">Excluir</button>
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={cancelDelete} aria-label="Cancelar exclusão">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Estoque;