import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Tipo {
    id: number;
    nome: string;
}

const tiposMock: Tipo[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    nome: `Tipo ${i + 1}`
}));

const TipoList: React.FC = () => {
    const navigate = useNavigate();
    const [tipos, setTipos] = useState<Tipo[]>(tiposMock);
    const [search, setSearch] = useState("");
    const tiposFiltrados = tipos.filter((t) => t.nome.toLowerCase().includes(search.toLowerCase()));
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [showNovo, setShowNovo] = useState(false);
    const [novoNome, setNovoNome] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState("");

    // Edição inline
    const handleEdit = (tipo: Tipo) => {
        setEditId(tipo.id);
        setEditNome(tipo.nome);
    };
    const handleEditSave = (id: number) => {
        setTipos((prev) => prev.map((t) => (t.id === id ? { ...t, nome: editNome } : t)));
        setEditId(null);
        setMensagem("Tipo atualizado com sucesso!");
        setTimeout(() => setMensagem(""), 2500);
    };
    const handleEditCancel = () => {
        setEditId(null);
        setEditNome("");
    };

    // Novo tipo
    const handleNovo = () => {
        if (!novoNome.trim()) return;
        const novo: Tipo = { id: tipos.length ? tipos[tipos.length - 1].id + 1 : 1, nome: novoNome };
        setTipos((prev) => [...prev, novo]);
        setNovoNome("");
        setShowNovo(false);
        setMensagem("Tipo cadastrado com sucesso!");
        setTimeout(() => setMensagem(""), 2500);
    };

    // Excluir tipo
    const handleDelete = (id: number) => {
        setTipos((prev) => prev.filter((t) => t.id !== id));
        setDeleteId(null);
        setMensagem("Tipo excluído com sucesso!");
        setTimeout(() => setMensagem(""), 2500);
    };

    return (
        <section className="w-full min-w-0 min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 transition-colors py-3 sm:py-6 font-inter">
            <div className="w-full min-w-0 px-2 sm:px-4 md:px-8 flex flex-col flex-1 items-start">
                <div className="w-full flex flex-col flex-1 md:pr-8 md:pl-2 xl:pr-16 xl:pl-6 items-start">
                    {/* Título com ícone de voltar */}
                    <div className="w-full flex items-center mb-2">
                        <button
                            className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => navigate(-1)}
                            aria-label="Voltar"
                        >
                            <FaArrowLeft className="text-xl text-gray-700 dark:text-gray-200" />
                        </button>
                        <h2 className="text-2xl font-bold text-left text-gray-900 dark:text-white pl-0">Tipos</h2>
                    </div>
                    {/* Campo de pesquisa e botões abaixo do título */}
                    <div className="w-full max-w-2xl mb-4 ml-0 mr-auto flex flex-col md:flex-row md:items-center md:gap-4">
                        <input
                            type="text"
                            className="w-full md:w-64 p-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all"
                            placeholder="Pesquisar tipo..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); }}
                            style={{ minWidth: 0 }}
                        />
                        <div className="flex gap-2 mt-2 md:mt-0">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowNovo((v) => !v)}>Novo Tipo</button>
                        </div>
                    </div>
                    {showNovo && (
                        <div className="mb-4 flex gap-2 w-full max-w-2xl ml-0 mr-auto">
                            <input
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                placeholder="Nome do tipo"
                                value={novoNome}
                                onChange={(e) => setNovoNome(e.target.value)}
                                autoFocus
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded" onClick={handleNovo}>Salvar</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 rounded" onClick={() => setShowNovo(false)}>Cancelar</button>
                        </div>
                    )}
                    {/* Scrollbar customizada e tabela responsiva */}
                    <style>{`
                        #tipos-scroll::-webkit-scrollbar { display: none !important; }
                        #tipos-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
                    `}</style>
                    <div
                        id="tipos-scroll"
                        className="overflow-x-auto overflow-y-auto max-h-[70vh] min-h-[300px] custom-scrollbar-hide w-full max-w-2xl ml-0 mr-auto rounded-xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                        <table className="min-w-full w-full text-xs sm:text-sm text-left text-gray-900 dark:text-white">
                            <thead>
                                <tr>
                                    <th className="px-2 sm:px-4 py-2">N°</th>
                                    <th className="px-2 sm:px-4 py-2">Nome</th>
                                    <th className="px-2 sm:px-4 py-2 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tiposFiltrados.length === 0 && (
                                    <tr><td colSpan={3} className="px-2 sm:px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Nenhum tipo cadastrado.</td></tr>
                                )}
                                {tiposFiltrados.map((tipo) => (
                                    <tr key={tipo.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <td className="px-2 sm:px-4 py-2">{tipo.id}</td>
                                        <td className="px-2 sm:px-4 py-2">
                                            {editId === tipo.id ? (
                                                <input
                                                    className="p-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    value={editNome}
                                                    onChange={(e) => setEditNome(e.target.value)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{tipo.nome}</span>
                                            )}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 text-center">
                                            {editId === tipo.id ? (
                                                <>
                                                    <button className="text-green-600 hover:text-green-800 mr-2" onClick={() => handleEditSave(tipo.id)} title="Salvar">✔</button>
                                                    <button className="text-red-600 hover:text-red-800" onClick={handleEditCancel} title="Cancelar">✖</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => handleEdit(tipo)} title="Editar">✎</button>
                                                    <button className="text-red-600 hover:text-red-800" onClick={() => setDeleteId(tipo.id)} title="Excluir">🗑</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Modal de confirmação de exclusão */}
                    {deleteId !== null && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                            <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-sm">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Confirmar exclusão</h3>
                                <p className="mb-4 text-gray-700 dark:text-gray-300">Deseja realmente excluir este tipo?</p>
                                <div className="flex justify-end gap-2">
                                    <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => handleDelete(deleteId)}>Excluir</button>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={() => setDeleteId(null)}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Mensagem de feedback */}
                    {mensagem && (
                        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50">
                            {mensagem}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TipoList;

