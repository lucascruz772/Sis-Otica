// FolhaPagamento.tsx
// Tela de folha de pagamento (RH).
// Exibe lista de colaboradores, salários, descontos e totais.
// Responsivo, dark mode, fonte Inter e mock data.
//
// Recursos:
// - Listagem de colaboradores e totais de folha.
// - Visualização de descontos e salários.
// - Cálculo automático de comissões e horas extras.
// - Download do holerite em PDF.
//
// Integrações Visuais:
// - Tema escuro e claro.
// - Estilo responsivo para diferentes tamanhos de tela.
// - Uso da fonte Inter.
//
// Responsividade garantida com Tailwind: tabelas usam overflow-x-auto, cards e grids se adaptam com breakpoints (sm, md, lg).
// Certifique-se de que a visualização de totais e descontos seja clara em telas pequenas.

import React, { useEffect } from "react";

// Mock de dados para folha de pagamento
const folhaPagamentoMock = [
    {
        id: 1,
        colaborador: {
            first_name: "João",
            FUNCAO: "G",
            data_contratacao: "2022-01-10",
            comissao_percentual: 5,
            valor_hora: 20,
        },
        salario_bruto: 3500,
        descontos: [
            { tipo: "Vale Transporte", percentual: 6 },
            { tipo: "Vale Alimentação", percentual: 3 },
        ],
        desconto_inss: 300,
        desconto_fgts: 200,
        desconto_irrf: 150,
        total_descontos: 650,
        comissoes: [
            { valor_vendas: 10000, horas_extras: 10 },
        ],
        total_comissao: 500,
        total_horas: 300,
        salario_liquido: 3650,
    },
    // ...adicione mais mocks se quiser
];

const mesAtual = "Junho";
const anoAtual = "2025";

const FolhaPagamento: React.FC = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4">
            {folhaPagamentoMock.map((item) => (
                <div key={item.id} className="mb-8">
                    <h2 className="text-center text-lg font-bold mb-2">
                        Holerite ({mesAtual}) x ({anoAtual})
                        <a
                            href={`#baixar_pdf_${item.id}`}
                            className="ml-4 text-blue-600 hover:underline text-base font-normal"
                            download
                        >
                            Baixar
                        </a>
                    </h2>
                    <div className="container mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-3">
                            <div className="border-b px-6 py-4">
                                <h5 className="text-center text-xl font-semibold">
                                    {item.colaborador.first_name} {" "}
                                    {item.colaborador.FUNCAO === "G" && (
                                        <span className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">Gerente</span>
                                    )}
                                    {item.colaborador.FUNCAO === "C" && (
                                        <span className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">Caixa</span>
                                    )}
                                    {item.colaborador.FUNCAO === "V" && (
                                        <span className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">Vendedor</span>
                                    )}
                                </h5>
                            </div>
                            <div className="px-6 py-4">
                                <div className="mb-2 text-center text-sm">
                                    Data Contratação: {item.colaborador.data_contratacao || "Sem Data"}
                                </div>
                                <div className="mb-2 flex flex-wrap items-center">
                                    <label className="w-full md:w-1/4 font-semibold">Salário Bruto</label>
                                    <input type="text" readOnly className="form-input w-full md:w-3/4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2" value={`R$ ${item.salario_bruto}`} />
                                </div>
                                <hr className="my-2" />
                                <div className="mb-2 flex flex-wrap items-start">
                                    <label className="w-full md:w-1/4 font-semibold">Descontos</label>
                                    <div className="w-full md:w-3/4 bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 text-black dark:text-white">
                                        {item.descontos.map((d, i) => (
                                            <div key={i}>{d.tipo}: {d.percentual}%</div>
                                        ))}
                                        Desconto INSS: R${item.desconto_inss}<br />
                                        Desconto FGTS: R${item.desconto_fgts}<br />
                                        Desconto IRRF: R${item.desconto_irrf}
                                        <hr className="my-2" />
                                        <b>Total: R$ {item.total_descontos}</b>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="mb-2 flex flex-wrap items-start">
                                    <label className="w-full md:w-1/4 font-semibold">Proventos</label>
                                    <div className="w-full md:w-3/4 bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 text-black dark:text-white">
                                        {item.comissoes.map((c, i) => (
                                            <div key={i}>Comissão R$ {c.valor_vendas} x {item.colaborador.comissao_percentual}%</div>
                                        ))}
                                        <hr className="my-2" />
                                        <b>Total: R$ {item.total_comissao}</b>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="mb-2 flex flex-wrap items-start">
                                    <label className="w-full md:w-1/4 font-semibold">Horas Extras</label>
                                    <div className="w-full md:w-3/4 bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 text-black dark:text-white">
                                        {item.comissoes.map((h, i) => (
                                            <div key={i}>Horas Trabalhadas {h.horas_extras} x {item.colaborador.valor_hora} + 50%</div>
                                        ))}
                                        <hr className="my-2" />
                                        <b>Total: R$ {item.total_horas}</b>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="mb-2 flex flex-wrap items-center">
                                    <label className="w-full md:w-1/4 font-semibold">Salário Líquido</label>
                                    <input type="text" readOnly className="form-input w-full md:w-3/4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2" value={`R$ ${item.salario_liquido}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FolhaPagamento;
