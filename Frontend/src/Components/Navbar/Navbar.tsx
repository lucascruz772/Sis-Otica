import React, { useState } from "react";
import { FaBars, FaUserCircle, FaChevronDown } from "react-icons/fa";

interface NavbarProps {
    onMinimizeSidebar?: () => void;
    minimized?: boolean;
    user?: {
        firstName: string;
        funcao: "G" | "C" | "V";
    };
}

const funcaoLabel = (funcao?: "G" | "C" | "V") => {
    if (funcao === "G") return "Gerente";
    if (funcao === "C") return "Caixa";
    if (funcao === "V") return "Vendedor";
    return "";
};

const Navbar: React.FC<NavbarProps> = ({ onMinimizeSidebar, minimized, user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav
            className="fixed top-0"
            style={{
                left: minimized ? "80px" : "256px",
                width: `calc(100% - ${minimized ? "80px" : "256px"})`,
                height: "80px",
                zIndex: 1200
            }}
        >
            <div className="w-full h-full flex items-center justify-between px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
                <button
                    onClick={onMinimizeSidebar}
                    className="text-gray-900 dark:text-white"
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        marginRight: "1rem"
                    }}
                    aria-label="Minimizar menu"
                >
                    <FaBars className="text-gray-900 dark:text-white" />
                </button>
                <div className="font-bold text-xl text-gray-900 dark:text-white">
                    Sis-Ótica
                </div>
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setDropdownOpen((open) => !open)}
                        className="flex items-center text-gray-900 dark:text-white"
                        style={{
                            background: "none",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                    >
                        <FaUserCircle size={36} className="text-gray-700 dark:text-white" />
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                            {user?.firstName || "Usuário"}
                        </span>
                        {user?.funcao && (
                            <span className="ml-2 bg-cyan-600 text-white rounded px-2 py-1 text-xs">
                                {funcaoLabel(user.funcao)}
                            </span>
                        )}
                        <FaChevronDown className="ml-2 text-gray-900 dark:text-white" />
                    </button>
                    {dropdownOpen && (
                        <div
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-900 dark:text-white"
                            style={{
                                position: "absolute",
                                right: 0,
                                top: "calc(100% + 8px)",
                                minWidth: 160,
                                zIndex: 1300
                            }}
                        >
                            <a
                                href="/editar-perfil"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                Editar Perfil
                            </a>
                            <div className="border-t border-gray-200 dark:border-gray-700" />
                            <a
                                href="/logout"
                                className="block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
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