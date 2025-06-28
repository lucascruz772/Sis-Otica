import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Tipo {
    id: number;
    nome: string;
}

const tiposMock: Tipo[] = [
    { id: 1, nome: "Tipo 1" },
    { id: 2, nome: "Tipo 2" },
    { id: 3, nome: "Tipo 3" },
    { id: 4, nome: "Tipo 4" },
    { id: 5, nome: "Tipo 5" },
    { id: 6, nome: "Tipo 6" },
    { id: 7, nome: "Tipo 7" },
];

const TipoList: React.FC = () => {
    const navigate = useNavigate();
    const [tipos, setTipos] = useState<Tipo[]>(tiposMock);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [search, setSearch] = useState("");
    const [itensPorPagina, setItensPorPagina] = useState(5);
    const tiposFiltrados = tipos.filter((t) => t.nome.toLowerCase().includes(search.toLowerCase()));
    const totalPaginas = Math.ceil(tiposFiltrados.length / itensPorPagina);
    const tiposPagina = tiposFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [showNovo, setShowNovo] = useState(false);
    const [novoNome, setNovoNome] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<string>("");

    // Mensagem temporária removida pois não está sendo utilizada
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
        setPaginaAtual(totalPaginas + 1); // Vai para última página
    };

    // Exclusão
    const handleDelete = (id: number) => {
        setTipos((prev) => prev.filter((t) => t.id !== id));
        setDeleteId(null);
        setMensagem("Tipo excluído com sucesso!");
        setTimeout(() => setMensagem(""), 2500);
    };

    return (
        <div className="container mx-auto py-4 px-4 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                {/* Toast de mensagem temporária */}
                {/* Toast de mensagem fixa alinhada com a barra de pesquisa, levemente para a direita */}
                <div className="fixed z-50" style={{ top: 'calc(80px + 1.5rem)', left: 'calc(36% - 53px)', transform: 'translateX(0)' }}>
                    {mensagem && (
                        <div
                            className={`px-3 py-1 rounded shadow text-sm font-medium text-left transition-opacity duration-300 bg-green-500 text-white`}
                            style={{ minWidth: '180px', height: '32px', lineHeight: '30px', opacity: mensagem ? 1 : 0 }}
                        >
                            {mensagem}
                        </div>
                    )}
                </div>
                <h2 className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Tipos</h2>
                {/* Barra de pesquisa */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <input
                        type="text"
                        className="w-full md:w-64 p-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all"
                        placeholder="Pesquisar tipo..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPaginaAtual(1); }}
                        style={{ minWidth: 0 }}
                    />
                </div>
                {/* Botões de ação */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowNovo((v) => !v)}
                    >
                        Novo Tipo
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </button>
                </div>
                {/* Formulário novo tipo */}
                {showNovo && (
                    <div className="mb-4 flex gap-2">
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
                {/* Tabela de tipos */}
                <div className="overflow-x-auto w-full">
                    <table className="min-w-[640px] table-auto w-full bg-white dark:bg-gray-800 rounded shadow">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left">N°</th>
                                <th className="px-4 py-2 border-b text-left">Nome</th>
                                <th className="px-4 py-2 border-b text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiposPagina.length === 0 && (
                                <tr><td colSpan={3} className="text-center py-4 text-gray-500 dark:text-gray-400">Nenhum tipo cadastrado.</td></tr>
                            )}
                            {tiposPagina.map((tipo) => (
                                <tr key={tipo.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 py-2 border-b">{tipo.id}</td>
                                    <td className="px-4 py-2 border-b">
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
                                    <td className="px-4 py-2 border-b text-center">
                                        {editId === tipo.id ? (
                                            <>
                                                <button className="text-green-600 hover:text-green-800 mr-2" onClick={() => handleEditSave(tipo.id)} title="Salvar"><FaCheck /></button>
                                                <button className="text-red-600 hover:text-red-800" onClick={handleEditCancel} title="Cancelar"><FaTimes /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => handleEdit(tipo)} title="Editar"><FaEdit /></button>
                                                <button className="text-red-600 hover:text-red-800" onClick={() => setDeleteId(tipo.id)} title="Excluir"><FaTrash /></button>
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
                    <a href="/estoque" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Voltar</a>
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
                            <p className="mb-4 text-gray-700 dark:text-gray-300">Deseja realmente excluir este tipo?</p>
                            <div className="flex justify-end gap-2">
                                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => handleDelete(deleteId)}>Excluir</button>
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={() => setDeleteId(null)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TipoList;
