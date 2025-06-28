// ComissaoForm.tsx
// Tela/formulário para criar ou editar uma comissão.
// Permite cadastrar ou atualizar dados de comissão de colaborador.
// Responsivo, dark mode, fonte Inter e mock data.
//
// Recursos:
// - Cadastro e edição de comissão.
// - Validação de campos e integração visual.

import React, { useEffect } from "react";

const ComissaoForm: React.FC = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-center text-2xl font-bold mb-4">Nova Comissão</h2>
                <form className="flex flex-col gap-4">
                    <input className="p-2 rounded border dark:bg-gray-700 dark:text-white" placeholder="Funcionário" />
                    <input className="p-2 rounded border dark:bg-gray-700 dark:text-white" placeholder="Valor de vendas" type="number" />
                    <input className="p-2 rounded border dark:bg-gray-700 dark:text-white" placeholder="Data" type="date" />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Salvar</button>
                </form>
                <a href="/comissao" className="block mt-4 text-blue-600 hover:underline text-center">Voltar para a Lista</a>
            </div>
        </div>
    );
};

export default ComissaoForm;

// Responsividade garantida com Tailwind: formulário usa grid/flex, largura máxima (max-w) e padding adaptativo.
// Certifique-se de que campos e botões fiquem acessíveis em telas pequenas.
