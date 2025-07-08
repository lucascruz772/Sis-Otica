import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

// Mock de estilos
const estilosMock = Array.from({ length: 50 }, (_, i) => ({ pk: i + 1, nome: `Estilo ${i + 1}` }));

const EstiloList: React.FC = () => {
    const navigate = useNavigate();
    const [estilos, setEstilos] = useState(estilosMock);
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [mensagem, setMensagem] = useState<string>("");

    // Filtro de busca
    const estilosFiltrados = estilos.filter((e) => e.nome.toLowerCase().includes(search.toLowerCase()));

    // Edição inline
    const handleEdit = (estilo: { pk: number; nome: string }) => {
        setEditId(estilo.pk);
        setEditNome(estilo.nome);
    };
    const handleEditSave = (pk: number) => {
        setEstilos((prev) => prev.map((e) => (e.pk === pk ? { ...e, nome: editNome } : e)));
        setEditId(null);
        setMensagem("Estilo atualizado com sucesso!");
        setTimeout(() => { setMensagem(""); }, 2500);
    };
    const handleEditCancel = () => {
        setEditId(null);
        setEditNome("");
    };

    // Exclusão
    const handleDelete = (pk: number) => {
        setDeleteId(pk);
    };
    const confirmDelete = () => {
        setEstilos((prev) => prev.filter((e) => e.pk !== deleteId));
        setDeleteId(null);
        setMensagem("Estilo excluído com sucesso!");
        setTimeout(() => { setMensagem(""); }, 2500);
    };
    const cancelDelete = () => {
        setDeleteId(null);
    };

    return (
        <section className="w-full min-w-0 min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 transition-colors py-3 sm:py-6 font-inter">
            {/* Mensagem de feedback fixa logo abaixo da navbar */}
            {mensagem && (
                <div className="fixed left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50" style={{ top: 88 }}>
                    {mensagem}
                </div>
            )}
            <div className="w-full min-w-0 px-2 sm:px-4 md:px-8 flex flex-col flex-1 items-start">
                <div className="w-full flex flex-col flex-1 md:pr-8 md:pl-2 xl:pr-16 xl:pl-6 items-start">
                    {/* Título com ícone de voltar alinhado à esquerda */}
                    <div className="w-full flex items-center mb-2">
                        <button
                            className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => navigate(-1)}
                            aria-label="Voltar"
                        >
                            <FaArrowLeft className="text-xl text-gray-700 dark:text-gray-200" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-left">Estilos</h2>
                    </div>
                    {/* Barra de pesquisa abaixo do título */}
                    <div className="w-full max-w-2xl mb-4 ml-0 mr-auto flex flex-col md:flex-row md:items-center md:gap-4">
                        <input
                            type="text"
                            className="w-full md:w-64 p-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all"
                            placeholder="Pesquisar estilo..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); }}
                            style={{ minWidth: 0 }}
                        />
                    </div>
                    {/* Scrollbar customizada e tabela responsiva */}
                    <style>{`
                        #estilos-scroll::-webkit-scrollbar { display: none !important; }
                        #estilos-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
                    `}</style>
                    <div
                        id="estilos-scroll"
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
                                {estilosFiltrados.length === 0 && (
                                    <tr><td colSpan={3} className="px-2 sm:px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Nenhum estilo cadastrado.</td></tr>
                                )}
                                {estilosFiltrados.map((estilo) => (
                                    <tr key={estilo.pk} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <td className="px-2 sm:px-4 py-2">{estilo.pk}</td>
                                        <td className="px-2 sm:px-4 py-2">
                                            {editId === estilo.pk ? (
                                                <input
                                                    className="p-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    value={editNome}
                                                    onChange={e => setEditNome(e.target.value)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{estilo.nome}</span>
                                            )}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 text-center">
                                            {editId === estilo.pk ? (
                                                <>
                                                    <button className="text-green-600 hover:text-green-800 mr-2" onClick={() => handleEditSave(estilo.pk)} title="Salvar"><FaCheck /></button>
                                                    <button className="text-red-600 hover:text-red-800" onClick={handleEditCancel} title="Cancelar"><FaTimes /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => handleEdit(estilo)} title="Editar"><FaEdit /></button>
                                                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(estilo.pk)} title="Excluir"><FaTrash /></button>
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
                                <p className="mb-4 text-gray-700 dark:text-gray-300">Deseja realmente excluir este estilo?</p>
                                <div className="flex justify-end gap-2">
                                    <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={confirmDelete}>Excluir</button>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={cancelDelete}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EstiloList;
