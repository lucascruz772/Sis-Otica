import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaChevronDown } from "react-icons/fa";

interface NavbarProps {
    onMinimizeSidebar?: () => void;
    minimized?: boolean;
    user?: {
        firstName: string;
        funcao: "G" | "C" | "V";
    };
    fullWidth?: boolean;
}

const funcaoLabel = (funcao?: "G" | "C" | "V") => {
    if (funcao === "G") return "Gerente";
    if (funcao === "C") return "Caixa";
    if (funcao === "V") return "Vendedor";
    return "";
};

const Navbar: React.FC<NavbarProps> = ({ onMinimizeSidebar, minimized, user, fullWidth }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Detecta se está em mobile (até sm)
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Detecta se a sidebar está oculta (minimized e fullWidth true)
    const sidebarOculta = isMobile && minimized && fullWidth;

    // Garante darkmode como padrão (executa apenas uma vez)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <nav
            className={
                sidebarOculta
                    ? "fixed top-0 left-0 w-full z-30 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
                    : "fixed top-0 z-30 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
            }
            style={
                sidebarOculta
                    ? { height: '48px', left: 0, width: '100%' }
                    : isMobile
                        ? { height: '48px', left: minimized ? '64px' : '0', width: minimized ? 'calc(100% - 64px)' : '100%' }
                        : {
                            left: fullWidth ? 0 : (minimized ? '80px' : '256px'),
                            width: fullWidth ? '100%' : `calc(100% - ${minimized ? '80px' : '256px'})`,
                            height: '80px'
                        }
            }
        >
            <div className={sidebarOculta || isMobile ? "w-full h-full flex items-center justify-between px-3" : "h-full flex items-center justify-between px-8"}>
                {/* Botão de menu lateral: visível só em mobile (até md) */}
                <button
                    onClick={onMinimizeSidebar}
                    className="inline-flex md:hidden text-gray-900 dark:text-white bg-transparent border-0 cursor-pointer text-xl mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={minimized ? "Expandir menu" : "Minimizar menu"}
                    tabIndex={0}
                >
                    <FaBars className="text-gray-900 dark:text-white" />
                </button>
                {/* Botão desktop (opcional): pode ser removido se não quiser minimizar no desktop */}
                {/* <button
                    onClick={onMinimizeSidebar}
                    className="hidden md:inline-flex text-gray-900 dark:text-white bg-transparent border-0 cursor-pointer text-xl md:text-2xl mr-2 md:mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={minimized ? "Expandir menu" : "Minimizar menu"}
                    tabIndex={0}
                >
                    <FaBars className="text-gray-900 dark:text-white" />
                </button> */}
                <div className={isMobile ? "font-bold text-base text-gray-900 dark:text-white" : "font-bold text-xl text-gray-900 dark:text-white"}>
                    Sis-Ótica
                </div>
                {/* Link para a UI Demo (apenas para dev, pode remover em produção) */}
                <a
                    href="/ui-demo"
                    className="ml-4 px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition hidden md:inline-block"
                    title="Demonstração de UI"
                >
                    UI Demo
                </a>
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setDropdownOpen((open) => !open)}
                        className={isMobile ? "flex items-center text-gray-900 dark:text-white bg-transparent border-0 cursor-pointer text-base rounded-none" : "flex items-center text-gray-900 dark:text-white bg-transparent border-0 cursor-pointer text-lg rounded-none"}
                    >
                        <FaUserCircle size={isMobile ? 24 : 28} className="text-gray-700 dark:text-white" />
                        <span className="ml-1 sm:ml-2 font-medium text-gray-900 dark:text-white hidden xs:inline">{user?.firstName || "Usuário"}</span>
                        {user?.funcao && (
                            <span className="ml-1 sm:ml-2 bg-cyan-600 text-white rounded-none px-1.5 py-0.5 text-[10px] sm:text-xs">{funcaoLabel(user.funcao)}</span>
                        )}
                        <FaChevronDown className="ml-1 sm:ml-2 text-gray-900 dark:text-white" />
                    </button>
                    {dropdownOpen && (
                        <div
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-none shadow-lg text-gray-900 dark:text-white absolute right-0 mt-2 min-w-[140px] sm:min-w-[160px] z-40"
                        >
                            <a
                                href="/editar-perfil"
                                className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
                            >
                                Editar Perfil
                            </a>
                            <div className="border-t border-gray-200 dark:border-gray-700" />
                            <a
                                href="/logout"
                                className="block px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs sm:text-sm"
                            >
                                Sair
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// IMPORTANTE: Para evitar que a Navbar sobreponha o conteúdo no mobile, garanta que o container principal das páginas use 'pt-12' (ou 'pt-[48px]') no mobile e 'pt-20' (ou 'pt-[80px]') em telas maiores.
// Exemplo em App.tsx ou no layout principal:
// <div className="pt-12 sm:pt-20"> ...conteúdo... </div>