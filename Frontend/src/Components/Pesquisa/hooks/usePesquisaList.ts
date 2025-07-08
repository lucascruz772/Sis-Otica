import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const INITIAL_VISIBLE = 20;
const LOAD_MORE_STEP = 20;

export function usePesquisaList() {
  interface Ordem {
    id: number;
    servico: string | number;
    cliente: string | number;
    vendedor: string | number;
    lentes: string;
    dataPedido: string;
    status: string;
    telefone: string;
    previsaoEntrega: string;
  }
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientesMap, setClientesMap] = useState<Record<number, string>>({});
  const [vendedoresMap, setVendedoresMap] = useState<Record<number, string>>(
    {}
  );
  const [servicosMap, setServicosMap] = useState<Record<number, string>>({});
  const [searchCliente, setSearchCliente] = useState("");
  const [searchOS, setSearchOS] = useState("");
  const [status, setStatus] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      axios.get("/api/v1/ordens/"),
      axios.get("/api/v1/clientes/"),
      axios.get("/api/v1/usuarios/"),
      axios.get("/api/v1/servicos/"),
    ])
      .then(([ordensRes, clientesRes, usuariosRes, servicosRes]) => {
        // ...mapeamento igual ao componente original...
        interface Cliente {
          id: number;
          NOME?: string;
          nome?: string;
          Nome?: string;
        }
        const clientesArr = Array.isArray(clientesRes.data.results)
          ? (clientesRes.data.results as Cliente[])
          : [];
        const clientesMap: Record<number, string> = {};
        clientesArr.forEach((c: Cliente) => {
          clientesMap[c.id] = c.NOME ?? c.nome ?? c.Nome ?? "";
        });
        setClientesMap(clientesMap);

        interface Usuario {
          id: number;
          username?: string;
          first_name?: string;
          FUNCAO?: string;
        }
        const usuariosArr = Array.isArray(usuariosRes.data.results)
          ? (usuariosRes.data.results as Usuario[])
          : [];
        const vendedoresMap: Record<number, string> = {};
        usuariosArr.forEach((u: Usuario) => {
          vendedoresMap[Number(u.id)] = u.first_name ?? u.username ?? "";
        });
        setVendedoresMap(vendedoresMap);

        interface Servico {
          id: number;
          NOME?: string;
          nome?: string;
          Nome?: string;
        }
        const servicosArr = Array.isArray(servicosRes.data.results)
          ? (servicosRes.data.results as Servico[])
          : [];
        const servicosMap: Record<number, string> = {};
        servicosArr.forEach((s: Servico) => {
          servicosMap[s.id] = s.NOME ?? s.nome ?? s.Nome ?? "";
        });
        setServicosMap(servicosMap);

        const results = Array.isArray(ordensRes.data.results)
          ? ordensRes.data.results
          : [];
        const mapped = results.map((item: Record<string, unknown>) => ({
          id: item.id as number,
          servico: (item.SERVICO ?? "") as string | number,
          cliente: (item.CLIENTE ?? "") as string | number,
          vendedor: (item.VENDEDOR ?? "") as string | number,
          lentes: (item.LENTES ?? "") as string,
          dataPedido: (item.DATA_SOLICITACAO ?? "") as string,
          status: (item.STATUS ?? "") as string,
          telefone: (item.DNP ?? "") as string,
          previsaoEntrega: (item.PREVISAO_ENTREGA ?? "") as string,
        }));
        setOrdens(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao buscar dados da API");
        setLoading(false);
      });
  }, []);

  // Filtro
  const filtered = ordens.filter(
    (os) =>
      (searchCliente === "" ||
        (clientesMap[Number(os.cliente)] &&
          clientesMap[Number(os.cliente)]
            .toLowerCase()
            .includes(searchCliente.toLowerCase()))) &&
      (searchOS === "" || os.id?.toString().includes(searchOS)) &&
      (status === "" || os.status === status) &&
      (dataInicio === "" || os.dataPedido >= dataInicio) &&
      (dataFim === "" || os.dataPedido <= dataFim)
  );

  // Scroll infinito: itens visíveis
  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const loadMore = useCallback(() => {
    if (hasMore)
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_MORE_STEP, filtered.length)
      );
  }, [hasMore, filtered.length]);
  const resetVisible = useCallback(() => setVisibleCount(INITIAL_VISIBLE), []);

  // Sempre que filtros mudarem, reseta o visibleCount
  useEffect(() => {
    resetVisible();
  }, [searchCliente, searchOS, status, dataInicio, dataFim, resetVisible]);

  return {
    loading,
    error,
    clientesMap,
    vendedoresMap,
    servicosMap,
    searchCliente,
    setSearchCliente,
    searchOS,
    setSearchOS,
    status,
    setStatus,
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    filtered,
    visibleItems,
    hasMore,
    loadMore,
  };
}
