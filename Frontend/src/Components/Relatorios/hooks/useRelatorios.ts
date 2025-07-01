import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

export function useRelatorios() {
  // States para cards
  const [clientes, setClientes] = useState<number>(0);
  const [osEmAberto, setOsEmAberto] = useState<number>(0);
  const [receberHoje, setReceberHoje] = useState<number>(0);
  // States para gráficos
  const [vendas12Meses, setVendas12Meses] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
  const [fluxoMensal, setFluxoMensal] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
  // Refs para os gráficos
  const vendasChartRef = useRef<HTMLCanvasElement | null>(null);
  const fluxoChartRef = useRef<HTMLCanvasElement | null>(null);
  const vendasChartInstance = useRef<Chart | null>(null);
  const fluxoChartInstance = useRef<Chart | null>(null);
  // State para tema
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

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

  const MOCK_VENDAS_12_MESES = {
    labels: [
      "Jul/24",
      "Ago/24",
      "Set/24",
      "Out/24",
      "Nov/24",
      "Dez/24",
      "Jan/25",
      "Fev/25",
      "Mar/25",
      "Abr/25",
      "Mai/25",
      "Jun/25",
    ],
    data: [
      1200, 1500, 1100, 1800, 1700, 2000, 2100, 1900, 2200, 2300, 2500, 2400,
    ],
  };
  const MOCK_FLUXO_MENSAL = {
    labels: [
      "Jul/24",
      "Ago/24",
      "Set/24",
      "Out/24",
      "Nov/24",
      "Dez/24",
      "Jan/25",
      "Fev/25",
      "Mar/25",
      "Abr/25",
      "Mai/25",
      "Jun/25",
    ],
    data: [800, 900, 700, 1200, 1100, 1300, 1400, 1350, 1500, 1600, 1700, 1650],
  };

  useEffect(() => {
    fetch("/api/v1/vendas_ultimos_12_meses/")
      .then((res) => res.json())
      .then((data) => {
        if (
          data &&
          Array.isArray(data.labels) &&
          Array.isArray(data.valores) &&
          data.labels.length &&
          data.valores.length
        ) {
          setVendas12Meses({ labels: data.labels, data: data.valores });
        } else {
          setVendas12Meses(MOCK_VENDAS_12_MESES);
        }
      })
      .catch(() => setVendas12Meses(MOCK_VENDAS_12_MESES));
    fetch("/api/v1/transacoes_mensais/")
      .then((res) => res.json())
      .then((data) => {
        if (
          data &&
          Array.isArray(data.labels) &&
          Array.isArray(data.valores) &&
          data.labels.length &&
          data.valores.length
        ) {
          setFluxoMensal({ labels: data.labels, data: data.valores });
        } else {
          setFluxoMensal(MOCK_FLUXO_MENSAL);
        }
      })
      .catch(() => setFluxoMensal(MOCK_FLUXO_MENSAL));
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

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
              backgroundColor: isDark ? "#60a5fa" : "#007bff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 28 } },
          plugins: {
            legend: {
              display: false,
              labels: { color: isDark ? "#f3f4f6" : "#222" },
            },
            datalabels: {
              anchor: "end",
              align: "end",
              color: isDark ? "#fff" : "#000",
              font: { weight: "bold", size: 12 },
              formatter: function (value: number) {
                return value;
              },
            },
          },
          animation: false,
          scales: {
            x: {
              ticks: { color: isDark ? "#f3f4f6" : "#222" },
              grid: { color: isDark ? "#374151" : "#e5e7eb" },
            },
            y: {
              ticks: { color: isDark ? "#f3f4f6" : "#222" },
              grid: { color: isDark ? "#374151" : "#e5e7eb" },
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }
    return () => {
      if (vendasChartInstance.current) vendasChartInstance.current.destroy();
    };
  }, [vendas12Meses, isDark]);

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
              borderColor: isDark ? "#60d394" : "#28a745",
              backgroundColor: isDark
                ? "rgba(96,211,148,0.1)"
                : "rgba(40,167,69,0.1)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 28 } },
          plugins: {
            legend: {
              display: false,
              labels: { color: isDark ? "#f3f4f6" : "#222" },
            },
            datalabels: {
              anchor: "end",
              align: "end",
              color: isDark ? "#fff" : "#000",
              font: { weight: "bold", size: 12 },
              formatter: function (value: number) {
                return value;
              },
            },
          },
          animation: false,
          scales: {
            x: {
              ticks: { color: isDark ? "#f3f4f6" : "#222" },
              grid: { color: isDark ? "#374151" : "#e5e7eb" },
            },
            y: {
              ticks: { color: isDark ? "#f3f4f6" : "#222" },
              grid: { color: isDark ? "#374151" : "#e5e7eb" },
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }
    return () => {
      if (fluxoChartInstance.current) fluxoChartInstance.current.destroy();
    };
  }, [fluxoMensal, isDark]);

  return {
    clientes,
    osEmAberto,
    receberHoje,
    vendas12Meses,
    fluxoMensal,
    vendasChartRef,
    fluxoChartRef,
    isDark,
  };
}
