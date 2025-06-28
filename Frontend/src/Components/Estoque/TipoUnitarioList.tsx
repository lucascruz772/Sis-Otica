import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

// Mock de tipos unitários
const tiposUnitariosMock = [
    { pk: 1, nome: "Tipo Unitário 1" },
    { pk: 2, nome: "Tipo Unitário 2" },
    { pk: 3, nome: "Tipo Unitário 3" },
    { pk: 4, nome: "Tipo Unitário 4" },
    { pk: 5, nome: "Tipo Unitário 5" },
    { pk: 6, nome: "Tipo Unitário 6" },
    { pk: 7, nome: "Tipo Unitário 7" },
    { pk: 8, nome: "Tipo Unitário 8" },
    { pk: 9, nome: "Tipo Unitário 9" },
    { pk: 10, nome: "Tipo Unitário 10" },
];

const TipoUnitarioList: React.FC = () => {
    const navigate = useNavigate();
    const [tipos, setTipos] = useState(tiposUnitariosMock);
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [search, setSearch] = useState("");
    const [itensPorPagina, setItensPorPagina] = useState(5);
    const [mensagem, setMensagem] = useState<string>("");
    const [mensagemTipo, setMensagemTipo] = useState<'sucesso' | 'erro' | ''>('');

    // Filtro de busca
    const tiposFiltrados = tipos.filter((e) => e.nome.toLowerCase().includes(search.toLowerCase()));
    const totalPaginas = Math.ceil(tiposFiltrados.length / itensPorPagina);
    const tiposPagina = tiposFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

    // Edição inline
    const handleEdit = (tipo: { pk: number; nome: string }) => {
        setEditId(tipo.pk);
        setEditNome(tipo.nome);
    };
    const handleEditSave = (pk: number) => {
        setTipos((prev) => prev.map((e) => (e.pk === pk ? { ...e, nome: editNome } : e)));
        setEditId(null);
        setMensagem("Tipo Unitário atualizado com sucesso!");
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
        setTipos((prev) => prev.filter((e) => e.pk !== deleteId));
        setDeleteId(null);
        setMensagem("Tipo Unitário excluído com sucesso!");
        setMensagemTipo('sucesso');
        setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
    };
    const cancelDelete = () => {
        setDeleteId(null);
    };

    return (
        <div className="container mx-auto py-4 px-4 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-4">Tipos Unitários</h2>
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
                            placeholder="Pesquisar tipo unitário..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPaginaAtual(1); }}
                            style={{ minWidth: 0 }}
                        />
                    </div>
                </div>
                {/* Tabela de tipos unitários */}
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
                            {tiposPagina.length === 0 && (
                                <tr><td colSpan={3} className="text-center py-4 text-gray-500 dark:text-gray-400">Nenhum tipo unitário cadastrado.</td></tr>
                            )}
                            {tiposPagina.map((tipo) => (
                                <tr key={tipo.pk} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 border-b">{tipo.pk}</td>
                                    <td className="px-4 py-2 border-b">
                                        {editId === tipo.pk ? (
                                            <input
                                                className="p-1 border rounded dark:bg-gray-700 dark:text-white"
                                                value={editNome}
                                                onChange={e => setEditNome(e.target.value)}
                                                autoFocus
                                            />
                                        ) : (
                                            <span>{tipo.nome}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        {editId === tipo.pk ? (
                                            <>
                                                <button className="text-green-600 hover:text-green-800 mr-2" onClick={() => handleEditSave(tipo.pk)} title="Salvar"><FaCheck /></button>
                                                <button className="text-red-600 hover:text-red-800" onClick={handleEditCancel} title="Cancelar"><FaTimes /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => handleEdit(tipo)} title="Editar"><FaEdit /></button>
                                                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(tipo.pk)} title="Excluir"><FaTrash /></button>
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
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </button>
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
                            <p className="mb-4 text-gray-700 dark:text-gray-300">Deseja realmente excluir este tipo unitário?</p>
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

export default TipoUnitarioList;
