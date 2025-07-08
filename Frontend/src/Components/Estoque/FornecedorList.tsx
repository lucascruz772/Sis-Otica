import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Mock de fornecedores
const fornecedoresMock = Array.from({ length: 50 }, (_, i) => ({
    pk: i + 1,
    nome: `Fornecedor ${i + 1}`
}));

const FornecedorList: React.FC = () => {
    const navigate = useNavigate();
    const [fornecedores, setFornecedores] = useState(fornecedoresMock);
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [mensagem, setMensagem] = useState<string>("");
    const [mensagemTipo, setMensagemTipo] = useState<'sucesso' | 'erro' | ''>('');

    // Filtro de busca
    const fornecedoresFiltrados = fornecedores.filter((f) => f.nome.toLowerCase().includes(search.toLowerCase()));

    // Edição inline
    const handleEdit = (fornecedor: { pk: number; nome: string }) => {
        setEditId(fornecedor.pk);
        setEditNome(fornecedor.nome);
    };
    const handleEditSave = (pk: number) => {
        if (!editNome.trim()) {
            setMensagem("O nome do fornecedor não pode estar vazio!");
            setMensagemTipo('erro');
            setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
            return;
        }
        setFornecedores((prev) => prev.map((f) => (f.pk === pk ? { ...f, nome: editNome } : f)));
        setEditId(null);
        setMensagem("Fornecedor atualizado com sucesso!");
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
        setFornecedores((prev) => prev.filter((f) => f.pk !== deleteId));
        setDeleteId(null);
        setMensagem("Fornecedor excluído com sucesso!");
        setMensagemTipo('sucesso');
        setTimeout(() => { setMensagem(""); setMensagemTipo(''); }, 2500);
    };
    const cancelDelete = () => {
        setDeleteId(null);
    };

    return (
        <div className="py-2 px-4 bg-white dark:bg-gray-900 min-h-0 transition-colors duration-300">
            {/* Mensagem fixa alinhada com a barra de pesquisa, levemente para a direita */}
            <div className="fixed z-50" style={{ top: 'calc(80px + 1.5rem)', left: 'calc(36% - 10px)', transform: 'translateX(0)' }}>
                {mensagem && (
                    <div
                        className={`px-3 py-1 rounded shadow text-sm font-medium text-left transition-opacity duration-300 ${mensagemTipo === 'sucesso' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                        style={{ minWidth: '180px', height: '32px', lineHeight: '30px', opacity: mensagem ? 1 : 0 }}
                    >
                        {mensagem}
                    </div>
                )}
            </div>
            <div className="w-full">
                {/* Título com ícone de voltar */}
                <div className="w-full flex items-center mb-4">
                    <button
                        className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => navigate(-1)}
                        aria-label="Voltar"
                    >
                        <FaArrowLeft className="text-xl text-gray-700 dark:text-gray-200" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-left">Fornecedores</h2>
                </div>
                {/* Contêiner para mensagem com espaçamento reservado */}
                <div className="relative mb-4">
                    {/* Barra de pesquisa com espaço garantido */}
                    <div className="mt-2">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-2 h-full">
                            <input
                                type="text"
                                className="w-full md:w-64 p-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all"
                                placeholder="Pesquisar fornecedor..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); }}
                                style={{ minWidth: 0 }}
                            />
                        </div>
                    </div>
                </div>
                {/* Tabela de fornecedores com scroll infinito invisível */}
                {/* Estilo global para esconder scrollbar da lista de fornecedores */}
                <style>{`
                    #fornecedores-scroll::-webkit-scrollbar { display: none !important; }
                    #fornecedores-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
                `}</style>
                <div className="w-full text-left">
                    <div
                        id="fornecedores-scroll"
                        className="overflow-auto rounded-xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-[80vh] max-w-3xl ml-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
                                {fornecedoresFiltrados.length === 0 && (
                                    <tr><td colSpan={3} className="px-2 sm:px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Nenhum fornecedor cadastrado.</td></tr>
                                )}
                                {fornecedoresFiltrados.map((fornecedor) => (
                                    <tr key={fornecedor.pk} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <td className="px-2 sm:px-4 py-2">{fornecedor.pk}</td>
                                        <td className="px-2 sm:px-4 py-2">
                                            {editId === fornecedor.pk ? (
                                                <input
                                                    className="p-1 border rounded dark:bg-gray-700 dark:text-white"
                                                    value={editNome}
                                                    onChange={(e) => setEditNome(e.target.value)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{fornecedor.nome}</span>
                                            )}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 text-center">
                                            {editId === fornecedor.pk ? (
                                                <>
                                                    <button className="text-green-600 hover:text-green-800 mr-2" onClick={() => handleEditSave(fornecedor.pk)} title="Salvar" aria-label="Salvar edição"><FaCheck /></button>
                                                    <button className="text-red-600 hover:text-red-800" onClick={handleEditCancel} title="Cancelar" aria-label="Cancelar edição"><FaTimes /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => handleEdit(fornecedor)} title="Editar" aria-label="Editar fornecedor"><FaEdit /></button>
                                                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(fornecedor.pk)} title="Excluir" aria-label="Excluir fornecedor"><FaTrash /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Modal de confirmação de exclusão */}
                {deleteId !== null && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" role="dialog" aria-labelledby="modal-title">
                        <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-sm">
                            <h3 id="modal-title" className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Confirmar exclusão</h3>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">Deseja realmente excluir este fornecedor?</p>
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

export default FornecedorList;