import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

// Mock de estilos
const estilosMock = [
    { pk: 1, nome: "Estilo 1" },
    { pk: 2, nome: "Estilo 2" },
    { pk: 3, nome: "Estilo 3" },
    { pk: 4, nome: "Estilo 4" },
    { pk: 5, nome: "Estilo 5" },
    { pk: 6, nome: "Estilo 6" },
    { pk: 7, nome: "Estilo 7" },
    { pk: 8, nome: "Estilo 8" },
    { pk: 9, nome: "Estilo 9" },
    { pk: 10, nome: "Estilo 10" },
];

const EstiloList: React.FC = () => {
    const navigate = useNavigate();
    const [estilos, setEstilos] = useState(estilosMock);
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [search, setSearch] = useState("");
    const [itensPorPagina, setItensPorPagina] = useState(5);
    const [mensagem, setMensagem] = useState<string>("");
    const [mensagemTipo, setMensagemTipo] = useState<'sucesso' | 'erro' | ''>('');

    // Filtro de busca
    const estilosFiltrados = estilos.filter((e) => e.nome.toLowerCase().includes(search.toLowerCase()));
    const totalPaginas = Math.ceil(estilosFiltrados.length / itensPorPagina);
    const estilosPagina = estilosFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

    // Edição inline
    const handleEdit = (estilo: { pk: number; nome: string }) => {
        setEditId(estilo.pk);
        setEditNome(estilo.nome);
    };
    const handleEditSave = (pk: number) => {
        setEstilos((prev) => prev.map((e) => (e.pk === pk ? { ...e, nome: editNome } : e)));
        setEditId(null);
        setMensagem("Estilo atualizado com sucesso!");
        setMensagemTipo('sucesso');
        setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
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
        setMensagemTipo('sucesso');
        setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
    };
    const cancelDelete = () => {
        setDeleteId(null);
    };

    return (
        <div className="container mx-auto py-4 px-4 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-4">Estilos</h2>
                {/* Mensagem de confirmação acima da barra de pesquisa, fora do bloco da barra */}
                {/* Mensagem fixa alinhada com a barra de pesquisa, levemente para a direita */}
                <div className="fixed z-50" style={{ top: 'calc(80px + 1.5rem)', left: 'calc(36% - 53px)', transform: 'translateX(0)' }}>
                    {mensagem && (
                        <div
                            className={`px-3 py-1 rounded shadow text-sm font-medium text-left transition-opacity duration-300 ${mensagemTipo === 'sucesso' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                            style={{ minWidth: '180px', height: '32px', lineHeight: '30px', opacity: mensagem ? 1 : 0 }}
                        >
                            {mensagem}
                        </div>
                    )}
                </div>
                {/* Barra de pesquisa */}
                <div className="mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-2 h-full">
                        <input
                            type="text"
                            className="w-full md:w-64 p-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all"
                            placeholder="Pesquisar estilo..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPaginaAtual(1); }}
                            style={{ minWidth: 0 }}
                        />
                    </div>
                </div>
                {/* Tabela de estilos */}
                <div className="w-full">
                    <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left">N°</th>
                                <th className="px-4 py-2 border-b text-left">Nome</th>
                                <th className="px-4 py-2 border-b text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estilosPagina.length === 0 && (
                                <tr><td colSpan={3} className="text-center py-4 text-gray-500 dark:text-gray-400">Nenhum estilo cadastrado.</td></tr>
                            )}
                            {estilosPagina.map((estilo) => (
                                <tr key={estilo.pk} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 border-b">{estilo.pk}</td>
                                    <td className="px-4 py-2 border-b">
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
                                    <td className="px-4 py-2 border-b text-center">
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
                {/* Paginação e botão de voltar */}
                <div className="flex justify-between items-center gap-2 mt-4">
                    <div className="mt-4 flex justify-center">
                        {/* Botão Voltar responsivo */}
                        <button
                            className="block sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 bg-gray-500 text-white hover:bg-gray-700 focus:bg-gray-700"
                            onClick={() => navigate(-1)}
                            aria-label="Voltar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="hidden sm:block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-2 flex-1">
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" disabled={paginaAtual === 1} onClick={() => setPaginaAtual(paginaAtual - 1)}>{'<'}</button>
                        <span className="text-gray-700 dark:text-gray-300">{paginaAtual} de {totalPaginas}</span>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" disabled={paginaAtual === totalPaginas || totalPaginas === 0} onClick={() => setPaginaAtual(paginaAtual + 1)}>{'>'}</button>
                        {/* Select de quantidade por página ao lado direito do paginator */}
                        <div className="flex items-center gap-2 ml-4">
                            <label className="text-gray-700 dark:text-gray-300">Exibir</label>
                            <select
                                className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                                value={itensPorPagina}
                                onChange={e => { setItensPorPagina(Number(e.target.value)); setPaginaAtual(1); }}
                            >
                                {[5, 10, 20, 50].map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                            <span className="text-gray-700 dark:text-gray-300">por página</span>
                        </div>
                    </div>
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
    );
};

export default EstiloList;
