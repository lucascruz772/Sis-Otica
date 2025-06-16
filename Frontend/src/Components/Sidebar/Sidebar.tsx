import React from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaHome, FaUsers, FaSearch, FaTasks, FaChartBar, FaBoxes, FaCashRegister, FaShoppingCart, FaMoneyCheckAlt, FaSignOutAlt } from "react-icons/fa";
import logo from "./LOGO-NOVA-PRETA .jpg";

const Sidebar: React.FC<{ minimized: boolean }> = ({ minimized }) => {
    return (
        <aside
            className={`bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-lg flex flex-col transition-all duration-300
            ${minimized ? 'w-20' : 'w-64'} min-h-screen`}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1100, // maior que o zIndex da navbar
                height: "100vh"
            }}
        >
            <div className="p-6 border-b dark:border-gray-700 flex flex-col items-center bg-gray-50 dark:bg-gray-900">
                <img
                    src={logo}
                    alt="logo"
                    className={`object-contain transition-all duration-300 ${minimized ? 'h-12' : 'h-28'}`}
                />
            </div>
            <nav className="flex-1 px-2 py-4 space-y-0">
                <SidebarItem minimized={minimized} to="/" icon={<FaHome />} label="Início" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/clientes" icon={<FaUsers />} label="Clientes" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/pesquisa" icon={<FaSearch />} label="Pesquisa" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/kanban" icon={<FaTasks />} label="Kanban" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/relatorios" icon={<FaChartBar />} label="Relatórios" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/estoque" icon={<FaBoxes />} label="Estoque" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/caixa" icon={<FaCashRegister />} label="Caixa" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/minhas-vendas" icon={<FaShoppingCart />} label="Minhas Vendas" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/folha-pagamento" icon={<FaMoneyCheckAlt />} label="Folha de Pagamento" />
                <div className="border-b mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/sair" icon={<FaSignOutAlt />} label="Sair" red />
            </nav>
            {/* Botão de alternar tema ao final da sidebar */}
            <ThemeToggleButton />
        </aside>
    );
};

// Componente para item do sidebar
const SidebarItem = ({ to, icon, label, minimized, red }: { to: string, icon: React.ReactNode, label: string, minimized: boolean, red?: boolean }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${red ? 'text-gray-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900' : 'text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'} ${minimized ? 'justify-center px-0' : ''}`}
        title={label}
    >
        <span className="text-xl">{icon}</span>
        {!minimized && <span>{label}</span>}
    </Link>
);

// Componente para alternar tema
const ThemeToggleButton: React.FC = () => {
    const [isDark, setIsDark] = React.useState(() =>
        typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
    );

    React.useEffect(() => {
        // Garante que o botão reflete o estado inicial
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            setIsDark(false);
        } else {
            html.classList.add('dark');
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="mt-auto mb-6 mx-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center"
            aria-label="Alternar modo escuro"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {isDark ? (
                    // Ícone de sol para modo claro
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
                ) : (
                    // Ícone de lua para modo escuro
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                )}
            </svg>
            {isDark ? 'Claro' : 'Escuro'}
        </button>
    );
};

export default Sidebar;