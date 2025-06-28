// RealizaPagamento.tsx
// Tela principal de comissões: lista de colaboradores e pagamentos.
// Permite navegar para detalhes, editar, criar e excluir comissões.
// Responsivo, dark mode, fonte Inter e mock data.
//
// Recursos:
// - Listagem de comissões e ações de CRUD.
// - Integração com rotas de detalhes, edição e exclusão.

import React, { useEffect } from "react";

// Mock de dados para comissões
const comissoesMock = [
    {
        pk: 1,
        colaborador: "João Silva",
        valor_vendas: 10000,
        data_referencia: "2025-06-01",
    },
    {
        pk: 2,
        colaborador: "Maria Souza",
        valor_vendas: 8000,
        data_referencia: "2025-06-01",
    },
    // ...adicione mais mocks se quiser
];

// Tela principal de comissões: lista de colaboradores e pagamentos.
// Permite navegar para detalhes, editar, criar e excluir comissões.
// Responsivo, dark mode, fonte Inter e mock data.
// Responsividade garantida com Tailwind: listas, cards e tabelas usam breakpoints e overflow-x-auto.
// Certifique-se de que botões e ações fiquem acessíveis em telas pequenas.
const ComissaoList: React.FC = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4 font-sans">
            <h2 className="text-center text-2xl font-bold mb-4">Comissão de Pagamento</h2>
            <div className="flex justify-end mb-4">
                <a href="/comissao/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">Nova Comissão</a>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto bg-white dark:bg-gray-800 rounded shadow">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Funcionário</th>
                            <th className="px-4 py-2 border-b text-left">Valor de vendas</th>
                            <th className="px-4 py-2 border-b text-left">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comissoesMock.map((comissao) => (
                            <tr key={comissao.pk} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="px-4 py-2 border-b">
                                    <a href={`/comissao/${comissao.pk}`} className="text-blue-600 hover:underline">{comissao.colaborador}</a>
                                </td>
                                <td className="px-4 py-2 border-b">R$ {comissao.valor_vendas.toLocaleString()}</td>
                                <td className="px-4 py-2 border-b">{comissao.data_referencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComissaoList;
