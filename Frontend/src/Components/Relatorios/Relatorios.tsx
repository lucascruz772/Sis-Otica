import React from "react";
import { useRelatorios } from "./hooks/useRelatorios";

const funcionariosMes = [
    { nome: "admin", pedidos: 3, vendas: 800, ticket: 266.67 }
];

const Relatorios: React.FC = () => {
    const {
        clientes,
        osEmAberto,
        receberHoje,
        vendasChartRef,
        fluxoChartRef
    } = useRelatorios();

    return (
        <div className="w-full min-w-0 py-0 px-2 sm:px-4 md:px-8 transition-colors duration-300 dark:text-white bg-white dark:bg-[#181a20]">
            {/* Barra de botões colada no topo */}
            <div className="flex gap-2 px-2 md:px-4 xl:px-8 pt-6 pb-3 sticky top-0 z-10 bg-transparent mb-0">
                <a className="rounded-t-md rounded-b-none px-4 py-2 font-semibold text-white bg-black hover:bg-gray-800 focus:bg-gray-900 border-0 shadow-none transition-all min-w-[110px] text-xs md:text-sm" href="/relatorio_mes_anterior">Vendedores Mês anteriores</a>
                <a className="rounded-t-md rounded-b-none px-4 py-2 font-semibold text-white bg-green-500 hover:bg-green-600 focus:bg-green-700 border-0 shadow-none transition-all min-w-[110px] text-xs md:text-sm" href="/export_clientes">Exportar Clientes</a>
                <a className="rounded-t-md rounded-b-none px-4 py-2 font-semibold text-white bg-cyan-400 hover:bg-cyan-500 focus:bg-cyan-600 border-0 shadow-none transition-all min-w-[110px] text-xs md:text-sm" href="/export_os">Exportar Os</a>
            </div>
            {/* Box Funcionários do mês */}
            <div className="mb-4 px-2 md:px-4 xl:px-8">
                <div className="border rounded-lg shadow bg-white dark:bg-gray-900 p-3 md:p-4 mx-auto max-w-[900px]">
                    <h5 className="text-center font-semibold mb-2 text-base md:text-lg dark:text-gray-100">Funcionários do mês</h5>
                    {funcionariosMes.map((f, i) => (
                        <div key={i} className="text-center text-xs md:text-base dark:text-gray-200">
                            {f.nome}: {f.pedidos} Pedidos R$ {f.vendas.toFixed(2)} em Vendas Ticket medio em {f.ticket}
                        </div>
                    ))}
                </div>
            </div>
            {/* Cards de resumo */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-stretch mb-5 px-0 md:px-0 xl:px-0 min-w-0 overflow-x-auto">
                <div className="flex-1 min-w-0 md:min-w-[220px] max-w-[320px]">
                    <div className="rounded-lg shadow text-white bg-[#1677ff] h-full min-h-[120px] flex flex-col justify-center">
                        <div className="flex flex-col justify-center items-center py-3 md:py-4 gap-1 md:gap-2">
                            <h5 className="font-bold text-base md:text-lg mb-1 dark:text-white">Ordens De Serviço Em Aberto Mês</h5>
                            <div className="dark:text-blue-100 text-xs md:text-base">Total de Vendas: {osEmAberto}</div>
                            <div className="dark:text-blue-100 text-xs md:text-base">Total de Valor: R$ 700,00</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-w-0 md:min-w-[220px] max-w-[320px]">
                    <div className="rounded-lg shadow text-white bg-[#b28704] h-full min-h-[120px] flex flex-col justify-center">
                        <div className="flex flex-col justify-center items-center py-3 md:py-4 gap-1 md:gap-2">
                            <h5 className="font-bold text-base md:text-lg mb-1 dark:text-white">Total de Clientes Cadastrados</h5>
                            <div className="dark:text-yellow-100 text-xs md:text-base">Ativos: {clientes}</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-w-0 md:min-w-[220px] max-w-[320px]">
                    <div className="rounded-lg shadow text-white bg-[#198754] h-full min-h-[120px] flex flex-col justify-center">
                        <div className="flex flex-col justify-center items-center py-3 md:py-4 gap-1 md:gap-2">
                            <h5 className="font-bold text-base md:text-lg mb-1 dark:text-white">Receber Hoje</h5>
                            <div className="dark:text-green-100 text-xs md:text-base">R$ {receberHoje}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Gráficos */}
            <div className="flex flex-col md:flex-row gap-6 mb-5 px-0 md:px-0 xl:px-0 min-w-0 overflow-x-auto">
                <div className="flex-1 bg-transparent min-w-0">
                    <h1 className="text-center mb-2 font-bold dark:text-white text-lg md:text-xl">Total de Vendas nos ultimos 12 Meses:</h1>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-2">
                        <canvas ref={vendasChartRef} height={240} style={{ minHeight: 180, height: 240 }} className="w-full max-w-full" />
                    </div>
                </div>
                <div className="flex-1 bg-transparent min-w-0">
                    <h1 className="text-center mb-2 font-bold dark:text-white text-lg md:text-xl">Fluxo de Caixa Mensal nos ultimos 12 Meses:</h1>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-2">
                        <canvas ref={fluxoChartRef} height={240} style={{ minHeight: 180, height: 240 }} className="w-full max-w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Relatorios;
