import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserPlus, FaStore, FaSearch } from "react-icons/fa";

// Mock de funcionários
const mockFuncionarios = [
    { id: 1, nome: "João da Ótica", telefone: "(31) 91234-5678", otica: "Ótica Central", gerente: true },
    { id: 2, nome: "Maria Silva", telefone: "(31) 99876-5432", otica: "Ótica Central", gerente: false },
    { id: 3, nome: "Carlos Souza", telefone: "(31) 98765-4321", otica: "Ótica Visão", gerente: false },
    { id: 4, nome: "Ana Paula", telefone: "(31) 91234-1111", otica: "Ótica Central", gerente: false },
    { id: 5, nome: "Bruno Lima", telefone: "(31) 91234-2222", otica: "Ótica Visão", gerente: false },
    { id: 6, nome: "Fernanda Alves", telefone: "(31) 91234-3333", otica: "Ótica Central", gerente: false },
    { id: 7, nome: "Lucas Martins", telefone: "(31) 91234-4444", otica: "Ótica Central", gerente: false },
    { id: 8, nome: "Patrícia Gomes", telefone: "(31) 91234-5555", otica: "Ótica Visão", gerente: false },
    { id: 9, nome: "Ricardo Dias", telefone: "(31) 91234-6666", otica: "Ótica Central", gerente: false },
    { id: 10, nome: "Juliana Rocha", telefone: "(31) 91234-7777", otica: "Ótica Central", gerente: false },
    { id: 11, nome: "Gabriel Costa", telefone: "(31) 91234-8888", otica: "Ótica Visão", gerente: false },
    { id: 12, nome: "Camila Pires", telefone: "(31) 91234-9999", otica: "Ótica Central", gerente: false },
    { id: 13, nome: "Thiago Melo", telefone: "(31) 91345-1234", otica: "Ótica Central", gerente: false },
    { id: 14, nome: "Larissa Faria", telefone: "(31) 91456-2345", otica: "Ótica Visão", gerente: false },
    { id: 15, nome: "Eduardo Nunes", telefone: "(31) 91567-3456", otica: "Ótica Central", gerente: false },
    { id: 16, nome: "Aline Duarte", telefone: "(31) 91678-4567", otica: "Ótica Central", gerente: false },
    { id: 17, nome: "Felipe Teixeira", telefone: "(31) 91789-5678", otica: "Ótica Visão", gerente: false },
    { id: 18, nome: "Vanessa Lopes", telefone: "(31) 91890-6789", otica: "Ótica Central", gerente: false },
    { id: 19, nome: "Rafael Pinto", telefone: "(31) 91901-7890", otica: "Ótica Central", gerente: false },
    { id: 20, nome: "Beatriz Ramos", telefone: "(31) 92012-8901", otica: "Ótica Visão", gerente: false },
    { id: 21, nome: "Marcos Tavares", telefone: "(31) 92123-9012", otica: "Ótica Central", gerente: false },
    { id: 22, nome: "Tatiane Souza", telefone: "(31) 92234-0123", otica: "Ótica Central", gerente: false },
    { id: 23, nome: "Pedro Henrique", telefone: "(31) 92345-1234", otica: "Ótica Visão", gerente: false },
    { id: 24, nome: "Sabrina Castro", telefone: "(31) 92456-2345", otica: "Ótica Central", gerente: false },
    { id: 25, nome: "André Barbosa", telefone: "(31) 92567-3456", otica: "Ótica Central", gerente: false },
    { id: 26, nome: "Débora Freitas", telefone: "(31) 92678-4567", otica: "Ótica Visão", gerente: false },
    { id: 27, nome: "Rodrigo Almeida", telefone: "(31) 92789-5678", otica: "Ótica Central", gerente: false },
    { id: 28, nome: "Isabela Cardoso", telefone: "(31) 92890-6789", otica: "Ótica Central", gerente: false },
    { id: 29, nome: "Vitor Santos", telefone: "(31) 92901-7890", otica: "Ótica Visão", gerente: false },
    { id: 30, nome: "Natália Rezende", telefone: "(31) 93012-8901", otica: "Ótica Central", gerente: false },
    { id: 31, nome: "Leandro Moreira", telefone: "(31) 93123-9012", otica: "Ótica Central", gerente: false },
    { id: 32, nome: "Priscila Mendes", telefone: "(31) 93234-0123", otica: "Ótica Visão", gerente: false },
    { id: 33, nome: "Alexandre Torres", telefone: "(31) 93345-1234", otica: "Ótica Central", gerente: false },
    { id: 34, nome: "Renata Guimarães", telefone: "(31) 93456-2345", otica: "Ótica Central", gerente: false },
    { id: 35, nome: "Fábio Cunha", telefone: "(31) 93567-3456", otica: "Ótica Visão", gerente: false },
    { id: 36, nome: "Simone Brito", telefone: "(31) 93678-4567", otica: "Ótica Central", gerente: false },
    { id: 37, nome: "Gustavo Ribeiro", telefone: "(31) 93789-5678", otica: "Ótica Central", gerente: false },
    { id: 38, nome: "Helena Martins", telefone: "(31) 93890-6789", otica: "Ótica Visão", gerente: false },
    { id: 39, nome: "Otávio Silveira", telefone: "(31) 93901-7890", otica: "Ótica Central", gerente: false },
    { id: 40, nome: "Letícia Amaral", telefone: "(31) 94012-8901", otica: "Ótica Central", gerente: false },
    { id: 41, nome: "Danilo Ferreira", telefone: "(31) 94123-9012", otica: "Ótica Visão", gerente: false },
    { id: 42, nome: "Viviane Lopes", telefone: "(31) 94234-0123", otica: "Ótica Central", gerente: false },
    { id: 43, nome: "Samuel Barros", telefone: "(31) 94345-1234", otica: "Ótica Central", gerente: false },
    { id: 44, nome: "Mônica Azevedo", telefone: "(31) 94456-2345", otica: "Ótica Visão", gerente: false },
    { id: 45, nome: "Henrique Souza", telefone: "(31) 94567-3456", otica: "Ótica Central", gerente: false },
    { id: 46, nome: "Cristina Dias", telefone: "(31) 94678-4567", otica: "Ótica Central", gerente: false },
    { id: 47, nome: "Wesley Rocha", telefone: "(31) 94789-5678", otica: "Ótica Visão", gerente: false },
    { id: 48, nome: "Elaine Pacheco", telefone: "(31) 94890-6789", otica: "Ótica Central", gerente: false },
    { id: 49, nome: "Sandro Oliveira", telefone: "(31) 94901-7890", otica: "Ótica Central", gerente: false },
    { id: 50, nome: "Paula Fernandes", telefone: "(31) 95012-8901", otica: "Ótica Visão", gerente: false },
];

// Mock de óticas
const mockOticas = [
    { id: 1, nome: "Ótica Central", rua: "Rua A, 123", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 91234-5678" },
    { id: 2, nome: "Ótica Visão", rua: "Av. B, 456", bairro: "Funcionários", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 99876-5432" },
    { id: 3, nome: "Ótica Cristal", rua: "Rua das Flores, 10", bairro: "Jardim", cidade: "Contagem", estado: "MG", contato: "(31) 91111-2222" },
    { id: 4, nome: "Ótica Luz", rua: "Av. Brasil, 200", bairro: "Centro", cidade: "Betim", estado: "MG", contato: "(31) 92222-3333" },
    { id: 5, nome: "Ótica Prisma", rua: "Rua Verde, 55", bairro: "Industrial", cidade: "Contagem", estado: "MG", contato: "(31) 93333-4444" },
    { id: 6, nome: "Ótica Foco", rua: "Av. Amazonas, 1000", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 94444-5555" },
    { id: 7, nome: "Ótica Real", rua: "Rua Azul, 77", bairro: "Santa Inês", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 95555-6666" },
    { id: 8, nome: "Ótica Nova", rua: "Av. Pedro II, 300", bairro: "Caiçara", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 96666-7777" },
    { id: 9, nome: "Ótica Horizonte", rua: "Rua do Sol, 12", bairro: "Sol Nascente", cidade: "Betim", estado: "MG", contato: "(31) 97777-8888" },
    { id: 10, nome: "Ótica Premium", rua: "Av. Afonso Pena, 500", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 98888-9999" },
    { id: 11, nome: "Ótica Mais", rua: "Rua das Palmeiras, 80", bairro: "Palmeiras", cidade: "Contagem", estado: "MG", contato: "(31) 90000-1111" },
    { id: 12, nome: "Ótica Ideal", rua: "Av. do Contorno, 1500", bairro: "Savassi", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 91112-2233" },
    { id: 13, nome: "Ótica Popular", rua: "Rua Popular, 99", bairro: "Popular", cidade: "Betim", estado: "MG", contato: "(31) 92223-3344" },
    { id: 14, nome: "Ótica Moderna", rua: "Av. das Américas, 400", bairro: "América", cidade: "Contagem", estado: "MG", contato: "(31) 93334-4455" },
    { id: 15, nome: "Ótica Brasil", rua: "Rua Brasil, 123", bairro: "Brasil", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 94445-5566" },
    { id: 16, nome: "Ótica Solar", rua: "Av. Solar, 321", bairro: "Sol", cidade: "Betim", estado: "MG", contato: "(31) 95556-6677" },
    { id: 17, nome: "Ótica Bela", rua: "Rua Bela Vista, 45", bairro: "Bela Vista", cidade: "Contagem", estado: "MG", contato: "(31) 96667-7788" },
    { id: 18, nome: "Ótica Top", rua: "Av. Topázio, 88", bairro: "Pedra Azul", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 97778-8899" },
    { id: 19, nome: "Ótica Classe", rua: "Rua Classe, 22", bairro: "Classe A", cidade: "Betim", estado: "MG", contato: "(31) 98889-9900" },
    { id: 20, nome: "Ótica Ponto de Vista", rua: "Av. Vista, 101", bairro: "Vista Alegre", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 90001-1222" },
    { id: 21, nome: "Ótica Olhar", rua: "Rua Olhar, 56", bairro: "Olhos D'Água", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 91113-2333" },
    { id: 22, nome: "Ótica Zoom", rua: "Av. Zoom, 78", bairro: "Zoom", cidade: "Contagem", estado: "MG", contato: "(31) 92224-3444" },
    { id: 23, nome: "Ótica Prisma BH", rua: "Rua Prisma, 12", bairro: "Prismas", cidade: "Belo Horizonte", estado: "MG", contato: "(31) 93335-4555" },
    { id: 24, nome: "Ótica Futura", rua: "Av. Futuro, 200", bairro: "Futuro", cidade: "Betim", estado: "MG", contato: "(31) 94446-5666" },
    { id: 25, nome: "Ótica Essencial", rua: "Rua Essencial, 1", bairro: "Essencial", cidade: "Contagem", estado: "MG", contato: "(31) 95557-6777" },
];

const Cadastro: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [funcionarios, setFuncionarios] = useState(mockFuncionarios);
    const [oticas, setOticas] = useState(mockOticas);
    const [searchFunc, setSearchFunc] = useState("");
    const [searchOtica, setSearchOtica] = useState("");
    const [msgSucesso, setMsgSucesso] = useState<string | null>(null);
    const [confirmRemover, setConfirmRemover] = useState<{ tipo: 'funcionario' | 'otica'; id: number } | null>(null);

    // Atualiza funcionário/ótica ao voltar do formulário de edição
    React.useEffect(() => {
        // --- Integração futura com API REST ---
        // if (location.state?.funcionarioEditado) {
        //   axios.put(`/api/funcionarios/${location.state.funcionarioEditado.id}`, location.state.funcionarioEditado)
        //     .then(() => setMsgSucesso("Funcionário editado com sucesso!"));
        // }
        // if (location.state?.funcionarioNovo) {
        //   axios.post(`/api/funcionarios`, location.state.funcionarioNovo)
        //     .then(() => setMsgSucesso("Funcionário cadastrado com sucesso!"));
        // }
        // if (location.state?.oticaEditada) {
        //   axios.put(`/api/oticas/${location.state.oticaEditada.id}`, location.state.oticaEditada)
        //     .then(() => setMsgSucesso("Ótica editada com sucesso!"));
        // }
        // if (location.state?.oticaNova) {
        //   axios.post(`/api/oticas`, location.state.oticaNova)
        //     .then(() => setMsgSucesso("Ótica cadastrada com sucesso!"));
        // }
        // ---------------------------------------
        if (location.state?.funcionarioEditado) {
            setFuncionarios(prev => {
                const idx = prev.findIndex(f => f.id === location.state.funcionarioEditado.id);
                if (idx !== -1) {
                    const novo = [...prev];
                    novo[idx] = location.state.funcionarioEditado;
                    return novo;
                } else {
                    return [...prev, location.state.funcionarioEditado];
                }
            });
            setMsgSucesso("Funcionário editado com sucesso!");
            navigate(-1);
            window.history.replaceState({}, document.title);
        }
        if (location.state?.funcionarioNovo) {
            setFuncionarios(prev => [...prev, location.state.funcionarioNovo]);
            setMsgSucesso("Funcionário cadastrado com sucesso!");
            navigate(-1);
            window.history.replaceState({}, document.title);
        }
        if (location.state?.oticaEditada) {
            setOticas(prev => {
                const idx = prev.findIndex(o => o.id === location.state.oticaEditada.id);
                if (idx !== -1) {
                    const novo = [...prev];
                    novo[idx] = location.state.oticaEditada;
                    return novo;
                } else {
                    return [...prev, location.state.oticaEditada];
                }
            });
            setMsgSucesso("Ótica editada com sucesso!");
            navigate(-1);
            window.history.replaceState({}, document.title);
        }
        if (location.state?.oticaNova) {
            setOticas(prev => [...prev, location.state.oticaNova]);
            setMsgSucesso("Ótica cadastrada com sucesso!");
            navigate(-1);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Filtro de pesquisa + ordenação alfabética (sem limitar a 5 linhas no array)
    const funcionariosFiltrados = funcionarios
        .filter(f =>
            f.nome.toLowerCase().includes(searchFunc.toLowerCase()) ||
            f.telefone.includes(searchFunc) ||
            f.otica.toLowerCase().includes(searchFunc.toLowerCase())
        )
        .sort((a, b) => a.nome.localeCompare(b.nome));
    const oticasFiltradas = oticas
        .filter(o =>
            o.nome.toLowerCase().includes(searchOtica.toLowerCase()) ||
            o.cidade.toLowerCase().includes(searchOtica.toLowerCase()) ||
            o.bairro.toLowerCase().includes(searchOtica.toLowerCase())
        )
        .sort((a, b) => a.nome.localeCompare(b.nome));

    // Edição de funcionário
    function handleEditarFuncionario(func: typeof mockFuncionarios[0]) {
        navigate("/funcionarios/novo", { state: { funcionario: func } });
    }
    // Exclusão de funcionário
    function handleRemoverFuncionario(id: number) {
        setConfirmRemover({ tipo: 'funcionario', id });
    }
    function confirmarRemoverFuncionario(id: number) {
        setFuncionarios(prev => prev.filter(f => f.id !== id));
        setMsgSucesso("Funcionário removido com sucesso!");
        setTimeout(() => setMsgSucesso(null), 1800);
        setConfirmRemover(null);
    }
    // Edição de ótica
    function handleEditarOtica(otica: typeof mockOticas[0]) {
        navigate("/oticas/novo", { state: { otica } });
    }
    // Exclusão de ótica
    function handleRemoverOtica(id: number) {
        setConfirmRemover({ tipo: 'otica', id });
    }
    function confirmarRemoverOtica(id: number) {
        setOticas(prev => prev.filter(o => o.id !== id));
        setMsgSucesso("Ótica removida com sucesso!");
        setTimeout(() => setMsgSucesso(null), 1800);
        setConfirmRemover(null);
    }

    return (
        <section className="w-full min-h-[calc(100vh-80px)] flex flex-col gap-10 bg-gray-50 dark:bg-gray-900 py-6 px-2 font-inter items-start">
            {msgSucesso && (
                <div className="fixed left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg z-50 font-semibold text-center min-w-[220px] max-w-[90vw] bg-green-500 text-white" style={{ top: 88 }} role="alert" aria-live="assertive">{msgSucesso}</div>
            )}
            {/* Bloco Funcionários */}
            <div className="w-full max-w-7xl p-0 bg-transparent dark:bg-transparent rounded-none shadow-none border-0 flex flex-col items-start">
                <h2 className="text-xl font-bold text-blue-900 dark:text-white text-left mb-2">Funcionários</h2>
                <div className="flex gap-2 w-full sm:w-auto justify-start mb-4">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
                            placeholder="Pesquisar funcionário..."
                            value={searchFunc}
                            onChange={e => setSearchFunc(e.target.value)}
                        />
                        <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <button
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow whitespace-nowrap"
                        onClick={() => navigate("/funcionarios/novo")}
                    >
                        <FaUserPlus className="text-lg" />
                        Novo Funcionário
                    </button>
                </div>
                <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent custom-scrollbar-hide" style={{ maxWidth: '100%', height: 260, minHeight: 0, overflowY: 'auto' }}>
                    <table className="w-full min-w-[900px] max-w-full table-auto text-xs sm:text-sm text-left text-gray-900 dark:text-white align-middle">
                        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 z-10">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Nome</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[110px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Telefone</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Ótica</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[80px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Cargo</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[80px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funcionariosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-2 sm:px-4 py-8 text-center text-gray-500 dark:text-gray-300 text-xs sm:text-sm">
                                        Nenhum funcionário cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                funcionariosFiltrados.map((f) => (
                                    <tr key={f.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <td className="px-2 sm:px-4 py-2 min-w-[120px] align-middle">{f.nome}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[110px] align-middle">{f.telefone}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[120px] align-middle">{f.otica}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[80px] align-middle">{f.gerente ? "Gerente" : "Padrão"}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[80px] align-middle flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-800" title="Editar" onClick={() => handleEditarFuncionario(f)}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm-2 2h.01M7 17a2 2 0 104 0 2 2 0 00-4 0z" /></svg>
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" title="Remover" onClick={() => handleRemoverFuncionario(f.id)}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Bloco Óticas */}
            <div className="w-full max-w-7xl p-0 bg-transparent dark:bg-transparent rounded-none shadow-none border-0 flex flex-col items-start">
                <h2 className="text-xl font-bold text-blue-900 dark:text-white text-left mb-2">Óticas</h2>
                <div className="flex gap-2 w-full sm:w-auto justify-start mb-4">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
                            placeholder="Pesquisar ótica..."
                            value={searchOtica}
                            onChange={e => setSearchOtica(e.target.value)}
                        />
                        <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <button
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow whitespace-nowrap"
                        onClick={() => navigate("/oticas/novo")}
                    >
                        <FaStore className="text-lg" />
                        Nova Ótica
                    </button>
                </div>
                <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent custom-scrollbar-hide" style={{ maxWidth: '100%', height: 260, minHeight: 0, overflowY: 'auto' }}>
                    <table className="w-full min-w-[1100px] max-w-full table-auto text-xs sm:text-sm text-left text-gray-900 dark:text-white align-middle">
                        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 z-10">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Nome</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Rua</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Bairro</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[120px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Cidade</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[80px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Estado</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[110px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Contato</th>
                                <th className="px-2 sm:px-4 py-2 min-w-[80px] text-left text-xs font-bold text-gray-700 dark:text-white uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oticasFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-2 sm:px-4 py-8 text-center text-gray-500 dark:text-gray-300 text-xs sm:text-sm">
                                        Nenhuma ótica cadastrada.
                                    </td>
                                </tr>
                            ) : (
                                oticasFiltradas.map((o) => (
                                    <tr key={o.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <td className="px-2 sm:px-4 py-2 min-w-[120px] align-middle">{o.nome}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[120px] align-middle">{o.rua}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[120px] align-middle">{o.bairro}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[120px] align-middle">{o.cidade}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[80px] align-middle">{o.estado}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[110px] align-middle">{o.contato}</td>
                                        <td className="px-2 sm:px-4 py-2 min-w-[80px] align-middle flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-800" title="Editar" onClick={() => handleEditarOtica(o)}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm-2 2h.01M7 17a2 2 0 104 0 2 2 0 00-4 0z" /></svg>
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" title="Remover" onClick={() => handleRemoverOtica(o.id)}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {confirmRemover && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
                        <span className="text-gray-900 dark:text-white font-semibold mb-4">Deseja remover {confirmRemover.tipo === 'funcionario' ? 'o funcionário' : 'a ótica'}?</span>
                        <div className="flex gap-4 mt-2">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => confirmRemover.tipo === 'funcionario' ? confirmarRemoverFuncionario(confirmRemover.id) : confirmarRemoverOtica(confirmRemover.id)}>Sim, remover</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={() => setConfirmRemover(null)}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Cadastro;
