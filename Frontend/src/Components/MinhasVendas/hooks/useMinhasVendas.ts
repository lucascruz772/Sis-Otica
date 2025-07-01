import { useState, useEffect } from "react";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50, 100];

const vendasMock = [
  {
    data: "2025-06-01",
    descricao: "Venda balcão #1",
    os: "1234",
    tipo: "Entrada",
    valor: "R$: 500,00",
    forma: "PIX",
  },
  {
    data: "2025-06-05",
    descricao: "Venda balcão #2",
    os: "1235",
    tipo: "Entrada",
    valor: "R$: 800,00",
    forma: "DINHEIRO",
  },
  {
    data: "2025-06-10",
    descricao: "Recebimento OS #3",
    os: "1236",
    tipo: "Entrada",
    valor: "R$: 1200,00",
    forma: "CREDITO",
  },
  // ...adicione mais mocks se quiser
];

export function useMinhasVendas() {
  const [search, setSearch] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  // Filtro de pesquisa e data
  const vendasFiltradas = vendasMock.filter((v) => {
    const matchSearch =
      v.descricao.toLowerCase().includes(search.toLowerCase()) ||
      v.os.toLowerCase().includes(search.toLowerCase()) ||
      v.forma.toLowerCase().includes(search.toLowerCase());
    const matchDataInicio = dataInicio ? v.data >= dataInicio : true;
    const matchDataFim = dataFim ? v.data <= dataFim : true;
    return matchSearch && matchDataInicio && matchDataFim;
  });

  const totalPages = Math.max(1, Math.ceil(vendasFiltradas.length / pageSize));
  const paginated = vendasFiltradas.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dataInicio, dataFim, pageSize]);

  return {
    search,
    setSearch,
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    PAGE_SIZE_OPTIONS,
    totalPages,
    paginated,
    vendasFiltradas,
  };
}
