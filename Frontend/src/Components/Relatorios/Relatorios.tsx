import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";


interface Vendas12Meses {
    labels: string[];
    data: number[];
}

interface FluxoMensal {
    labels: string[];
    data: number[];
}

const Relatorios: React.FC = () => {
    // States para cards
    const [clientes, setClientes] = useState<number>(0);
    const [osEmAberto, setOsEmAberto] = useState<number>(0);
    const [receberHoje, setReceberHoje] = useState<number>(0);
    // States para gráficos
    const [vendas12Meses, setVendas12Meses] = useState<Vendas12Meses>({ labels: [], data: [] });
    const [fluxoMensal, setFluxoMensal] = useState<FluxoMensal>({ labels: [], data: [] });
    // Refs para os gráficos
    const vendasChartRef = useRef<HTMLCanvasElement | null>(null);
    const fluxoChartRef = useRef<HTMLCanvasElement | null>(null);
    const vendasChartInstance = useRef<Chart | null>(null);
    const fluxoChartInstance = useRef<Chart | null>(null);

    // Fetch dos cards resumo
    useEffect(() => {
        fetch("/api/v1/dados_clientes/")
            .then((res) => res.json())
            .then((data) => setClientes(data.total_clientes || 0));
        fetch("/api/v1/obter_os_em_aberto/")
            .then((res) => res.json())
            .then((data) => setOsEmAberto(data.total_os_em_aberto || 0));
        fetch("/api/v1/receber/")
            .then((res) => res.json())
            .then((data) => setReceberHoje(data.total_receber_hoje || 0));
    }, []);

    // Fetch dos gráficos
    useEffect(() => {
        fetch("/api/v1/vendas_ultimos_12_meses/")
            .then((res) => res.json())
            .then((data) => setVendas12Meses({ labels: data.labels, data: data.valores }));
        fetch("/api/v1/transacoes_mensais/")
            .then((res) => res.json())
            .then((data) => setFluxoMensal({ labels: data.labels, data: data.valores }));
    }, []);

    // Renderiza gráfico de vendas
    useEffect(() => {
        if (vendasChartRef.current && vendas12Meses.labels.length) {
            if (vendasChartInstance.current) vendasChartInstance.current.destroy();
            vendasChartInstance.current = new Chart(vendasChartRef.current, {
                type: "bar",
                data: {
                    labels: vendas12Meses.labels,
                    datasets: [
                        {
                            label: "Vendas (R$)",
                            data: vendas12Meses.data,
                            backgroundColor: "#007bff",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                },
            });
        }
        return () => { if (vendasChartInstance.current) vendasChartInstance.current.destroy(); };
    }, [vendas12Meses]);

    // Renderiza gráfico de fluxo
    useEffect(() => {
        if (fluxoChartRef.current && fluxoMensal.labels.length) {
            if (fluxoChartInstance.current) fluxoChartInstance.current.destroy();
            fluxoChartInstance.current = new Chart(fluxoChartRef.current, {
                type: "line",
                data: {
                    labels: fluxoMensal.labels,
                    datasets: [
                        {
                            label: "Fluxo de Caixa (R$)",
                            data: fluxoMensal.data,
                            borderColor: "#28a745",
                            backgroundColor: "rgba(40,167,69,0.1)",
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                },
            });
        }
        return () => { if (fluxoChartInstance.current) fluxoChartInstance.current.destroy(); };
    }, [fluxoMensal]);

    // Dados de exemplo para funcionários do mês (substitua por fetch se necessário)
    const funcionariosMes = [
        { nome: "admin", pedidos: 3, vendas: 800, ticket: 266.67 }
    ];

    return (
        <div
            className="container-fluid py-0 px-0 transition-colors duration-300 dark:text-white bg-white dark:bg-[#181a20]"
            style={{
                maxWidth: '100vw',
                minHeight: '100vh',
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 24
            }}
        >
            {/* Barra de botões colada no topo */}
            <div className="flex gap-2 w-full px-0 pt-0 pb-3 sticky top-0 z-10 bg-transparent" style={{ marginBottom: 0 }}>
                <a className="rounded-t-md rounded-b-none px-4 py-2 font-semibold text-white bg-black hover:bg-gray-800 focus:bg-gray-900 border-0 shadow-none transition-all" style={{ minWidth: 120 }} href="/relatorio_mes_anterior">Vendedores Mês anteriores</a>
                <a className="rounded-t-md rounded-b-none px-4 py-2 font-semibold text-white bg-green-500 hover:bg-green-600 focus:bg-green-700 border-0 shadow-none transition-all" style={{ minWidth: 120 }} href="/export_clientes">Exportar Clientes</a>
                <a className="rounded-t-md rounded-b-none px-4 py-2 font-semibold text-white bg-cyan-400 hover:bg-cyan-500 focus:bg-cyan-600 border-0 shadow-none transition-all" style={{ minWidth: 120 }} href="/export_os">Exportar Os</a>
            </div>
            {/* Box Funcionários do mês */}
            <div className="mb-4 w-full px-0">
                <div className="border rounded-lg shadow bg-white dark:bg-gray-900 p-4 mx-auto" style={{ maxWidth: 900 }}>
                    <h5 className="text-center font-semibold mb-2 text-lg dark:text-gray-100">Funcionários do mês</h5>
                    {funcionariosMes.map((f, i) => (
                        <div key={i} className="text-center text-sm md:text-base dark:text-gray-200">
                            {f.nome}: {f.pedidos} Pedidos R$ {f.vendas.toFixed(2)} em Vendas Ticket medio em {f.ticket}
                        </div>
                    ))}
                </div>
            </div>
            {/* Cards de resumo */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch w-full mb-5 px-0" style={{ maxWidth: '100vw' }}>
                <div className="flex-1 min-w-[220px]">
                    <div className="rounded-lg shadow text-white" style={{ background: '#1677ff', minHeight: 130 }}>
                        <div className="flex flex-col justify-center items-center py-4">
                            <h5 className="font-bold text-lg mb-1 dark:text-white">Ordens De Serviço Em Aberto Mês</h5>
                            <div className="dark:text-blue-100">Total de Vendas: {osEmAberto}</div>
                            <div className="dark:text-blue-100">Total de Valor: R$ 700,00</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-w-[220px]">
                    <div className="rounded-lg shadow text-white" style={{ background: '#ffc107', minHeight: 130 }}>
                        <div className="flex flex-col justify-center items-center py-4">
                            <h5 className="font-bold text-lg mb-1 dark:text-white">Total de Clientes Cadastrados</h5>
                            <div className="dark:text-yellow-100">Ativos: {clientes}</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-w-[220px]">
                    <div className="rounded-lg shadow text-white" style={{ background: '#198754', minHeight: 130 }}>
                        <div className="flex flex-col justify-center items-center py-4">
                            <h5 className="font-bold text-lg mb-1 dark:text-white">Receber Hoje</h5>
                            <div className="dark:text-green-100">R$ {receberHoje}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Gráficos */}
            <div className="flex flex-col md:flex-row gap-4 w-full mb-5 px-0" style={{ maxWidth: '100vw' }}>
                <div className="flex-1 bg-transparent">
                    <h1 className="text-center mb-2 font-bold dark:text-white" style={{ fontSize: '2.2rem' }}>Total de Vendas nos ultimos 12 Meses:</h1>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-2">
                        <canvas ref={vendasChartRef} height={300} className="w-full" />
                    </div>
                </div>
                <div className="flex-1 bg-transparent">
                    <h1 className="text-center mb-2 font-bold dark:text-white" style={{ fontSize: '2.2rem' }}>Fluxo de Caixa Mensal nos ultimos 12 Meses:</h1>
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-2">
                        <canvas ref={fluxoChartRef} height={300} className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Relatorios;
