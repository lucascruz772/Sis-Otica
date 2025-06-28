// Sidebar.tsx
// Componente de menu lateral responsivo.
// Exibe links de navegação para as principais telas do sistema.
// Integra dark mode e usa a fonte Inter via Tailwind.
//
// Props:
// - minimized: controla se o sidebar está minimizado.
// - hideWhenMinimizedOnKanban: esconde o sidebar em rotas específicas (ex: Kanban).
//
// Garante responsividade usando classes Tailwind como 'hidden', 'md:block', 'w-20', 'md:w-64', etc.
// O menu se adapta para telas pequenas (sidebar minimizado) e grandes (sidebar expandido).

import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaSearch, FaTasks, FaChartBar, FaBoxes, FaCashRegister, FaShoppingCart, FaMoneyCheckAlt, FaSignOutAlt, FaMoneyBillWave } from "react-icons/fa";
import logo from "./LOGO-NOVA-PRETA .jpg";
import { ThemeContext } from '../../ThemeContext/themecontext';

const Sidebar: React.FC<{ minimized: boolean; hideWhenMinimizedOnKanban?: boolean }> = ({ minimized, hideWhenMinimizedOnKanban = false }) => {
    if (minimized && hideWhenMinimizedOnKanban) return null;
    return (
        <aside
            className={`
                fixed top-0 left-0 h-screen
                bg-white dark:bg-gray-900 border-r dark:border-gray-700 shadow-lg flex flex-col transition-all duration-300
                w-16 sm:w-20 md:w-64
            `}
        >
            <div className="p-2 sm:p-4 md:p-6 border-b dark:border-gray-700 flex flex-col items-center bg-gray-50 dark:bg-gray-900">
                <img
                    src={logo}
                    alt="logo"
                    className={`object-contain transition-all duration-300 h-10 sm:h-12 md:h-28`}
                />
            </div>
            <nav className="flex-1 px-0 sm:px-2 py-2 sm:py-4 space-y-0 overflow-y-auto">
                <SidebarItem minimized={minimized} to="/" icon={<FaHome />} label="Início" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/clientes" icon={<FaUsers />} label="Clientes" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/pesquisa" icon={<FaSearch />} label="Pesquisa" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/kanban" icon={<FaTasks />} label="Kanban" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/relatorios" icon={<FaChartBar />} label="Relatórios" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/estoque" icon={<FaBoxes />} label="Estoque" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/caixa" icon={<FaCashRegister />} label="Caixa" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/minhas-vendas" icon={<FaShoppingCart />} label="Minhas Vendas" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
                <SidebarItem minimized={minimized} to="/folha-pagamento" icon={<FaMoneyCheckAlt />} label="Folha de Pagamento" />
                <SidebarItem minimized={minimized} to="/comissao" icon={<FaMoneyBillWave />} label="Realizar Pagamento" />
                <div className="border-b mx-1 sm:mx-2 dark:border-gray-700" />
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
        className={`flex items-center justify-center md:justify-start gap-0 md:gap-3 px-0 md:px-4 py-2 rounded-lg font-medium transition ${red ? 'text-gray-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900' : 'text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'} ${minimized ? 'justify-center px-0' : ''}`}
        title={label}
    >
        <span className="text-lg sm:text-xl">{icon}</span>
        <span className="hidden md:inline">{!minimized && label}</span>
    </Link>
);

// Componente para alternar tema
const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="mt-auto mb-4 sm:mb-6 mx-2 sm:mx-4 px-2 sm:px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center text-xs sm:text-sm"
            aria-label="Alternar modo escuro"
        >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {isDark ? (
                    // Ícone de sol para modo claro
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
                ) : (
                    // Ícone de lua para modo escuro
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                )}
            </svg>
            <span className="hidden sm:inline">{isDark ? 'Claro' : 'Escuro'}</span>
        </button>
    );
};

export default Sidebar;