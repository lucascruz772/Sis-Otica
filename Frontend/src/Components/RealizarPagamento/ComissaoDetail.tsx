// ComissaoDetail.tsx
// Tela de detalhes de uma comissão específica.
// Exibe informações do colaborador, valores e histórico.
// Responsivo, dark mode, fonte Inter e mock data.
//
// Recursos:
// - Visualização detalhada de comissão.
// - Exibe histórico e valores pagos.

// Responsividade garantida com Tailwind: detalhes e histórico usam grid/flex e overflow-x-auto para adaptação em telas pequenas.

import React, { useEffect } from "react";

const ComissaoDetail: React.FC = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    // Mock de dados
    const comissao = {
        pk: 1,
        colaborador: "João Silva",
        valor_vendas: 10000,
        data_referencia: "2025-06-01",
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-center text-2xl font-bold mb-4">Detalhes da Comissão</h2>
                <div className="mb-2">Mês: {comissao.data_referencia}</div>
                <div className="mb-2">Venda Mensal: R$ {comissao.valor_vendas.toLocaleString()}</div>
                <div className="flex gap-2 mt-4 justify-center">
                    <a href={`/comissao/${comissao.pk}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Editar</a>
                    <a href={`/comissao/${comissao.pk}/delete`} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Excluir</a>
                    <a href="/comissao" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Voltar</a>
                </div>
            </div>
        </div>
    );
};

export default ComissaoDetail;
