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
            style={{
                position: "fixed",
                top: 0,
                left: minimized ? "80px" : "256px",
                width: `calc(100% - ${minimized ? "80px" : "256px"})`,
                height: "80px",
                background: "#fff",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2rem",
                zIndex: 1200
            }}
        >
            <button
                onClick={onMinimizeSidebar}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    marginRight: "1rem"
                }}
                aria-label="Minimizar menu"
            >
                <FaBars />
            </button>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Sis-Ótica
            </div>
            <div style={{ position: "relative" }}>
                <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    style={{
                        background: "none",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                >
                    <FaUserCircle size={36} color="#444" />
                    <span style={{ marginLeft: 8, fontWeight: 500 }}>
                        {user?.firstName || "Usuário"}
                    </span>
                    {user?.funcao && (
                        <span style={{
                            marginLeft: 8,
                            background: "#17a2b8",
                            color: "#fff",
                            borderRadius: 8,
                            padding: "2px 8px",
                            fontSize: 12
                        }}>
                            {funcaoLabel(user.funcao)}
                        </span>
                    )}
                    <FaChevronDown style={{ marginLeft: 8 }} />
                </button>
                {dropdownOpen && (
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "calc(100% + 8px)",
                            background: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            minWidth: 160,
                            zIndex: 1300
                        }}
                    >
                        <a href="/editar-perfil" style={{ display: "block", padding: "10px 16px", color: "#333", textDecoration: "none" }}>Editar Perfil</a>
                        <div style={{ borderTop: "1px solid #eee" }} />
                        <a href="/logout" style={{ display: "block", padding: "10px 16px", color: "#c00", textDecoration: "none" }}>Sair</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;