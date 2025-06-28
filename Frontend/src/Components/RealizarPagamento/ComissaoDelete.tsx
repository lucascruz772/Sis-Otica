// ComissaoDelete.tsx
// Tela de confirmação para exclusão de comissão.
// Exibe detalhes da comissão e solicita confirmação do usuário.
// Responsivo, dark mode, fonte Inter e mock data.
//
// Recursos:
// - Confirmação de exclusão de comissão.
// - Exibe detalhes antes de excluir.
// - Botões de ação para confirmar ou cancelar a exclusão.
// Responsividade garantida com Tailwind: modal de confirmação centralizado, largura máxima (max-w) e padding adaptativo.

import React, { useEffect } from "react";

const ComissaoDelete: React.FC = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-center text-2xl font-bold mb-4">Excluir Comissão</h2>
                <p className="text-center mb-4">Tem certeza de que deseja excluir "João Silva"?</p>
                <form className="text-center mb-4">
                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2">Confirmar</button>
                </form>
                <a href="/comissao" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Cancelar</a>
            </div>
        </div>
    );
};

export default ComissaoDelete;
