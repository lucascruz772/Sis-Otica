import React from "react";
import { useNavigate } from "react-router-dom";

const BotoesGerenciarOs: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="mb-4 flex justify-start gap-2">
            <button
                type="button"
                className="px-4 py-2 font-semibold shadow rounded border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-800"
                onClick={() => navigate("/servicos-cadastro")}
            >
                Gerenciar Serviços
            </button>
            <button
                type="button"
                className="px-4 py-2 font-semibold shadow rounded border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-800"
                onClick={() => navigate("/laboratorio-cadastro")}
            >
                Gerenciar Laboratórios
            </button>
        </div>
    );
};

export default BotoesGerenciarOs;
