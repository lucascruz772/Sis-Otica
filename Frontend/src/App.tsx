// App.tsx
// Arquivo principal de rotas e layout do frontend React.
// Define as rotas das páginas principais do sistema (Caixa, Minhas Vendas, Folha de Pagamento, Comissões, etc).
// Integra o Sidebar e aplica o tema global (Inter, Tailwind, dark mode).

import React, { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Sidebar from "./Components/Sidebar/Sidebar"
import Home from "./Components/Home/Home"
import Clientes from "./Components/Cliente/ClienteList"
import ClienteCadastro from "./Components/Cliente/ClienteCadastro"
import Navbar from "./Components/Navbar/Navbar"
import Pesquisa from "./Components/Pesquisa/Pesquisa";
import PesquisaView from "./Components/Pesquisa/PesquisaView";
import Kanban from "./Components/Kanban/Kanban";
import Relatorios from "./Components/Relatorios/Relatorios";
import useIsKanbanRoute from "./hooks/useIsKanbanRoute";
import Estoque from "./Components/Estoque/Estoque";
import FornecedorList from "./Components/Estoque/FornecedorList";
import TipoList from "./Components/Estoque/TipoList";
import EstiloList from "./Components/Estoque/EstiloList";
import TipoUnitarioList from "./Components/Estoque/TipoUnitarioList";
import Caixa from "./Components/Caixa/Caixa";
import VisualizarMesAnterior from "./Components/Caixa/VisualizarMesAnterior";
import AdicionarCaixa from "./Components/Caixa/AdicionarCaixa";
import { ThemeProvider } from "./ThemeContext/ThemeProvider";
import MinhasVendas from "./Components/MinhasVendas/MinhasVendas";
import FolhaPagamento from "./Components/FolhadePagamento/FolhaPagamento";
import ComissaoList from "./Components/RealizarPagamento/RealizaPagamento";
import ComissaoDetail from "./Components/RealizarPagamento/ComissaoDetail";
import ComissaoForm from "./Components/RealizarPagamento/ComissaoForm";
import ComissaoDelete from "./Components/RealizarPagamento/ComissaoDelete";

const App: React.FC = () => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const isKanban = useIsKanbanRoute();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarMinimized(true);
    }
    document.documentElement.classList.add('dark');
  }, []);

  // Verifica se está na rota de adicionar caixa

  return (
    <ThemeProvider>
      <Navbar
        onMinimizeSidebar={() => setSidebarMinimized((prev) => !prev)}
        minimized={sidebarMinimized}
        fullWidth={sidebarMinimized && isKanban}
      />
      <div className={`flex h-screen ${sidebarMinimized && isKanban ? '' : (sidebarMinimized ? 'md:pl-20' : 'md:pl-64')} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200`}>
        <Sidebar minimized={sidebarMinimized} hideWhenMinimizedOnKanban={isKanban} />
        <main
          className={`
            flex-1 flex flex-col w-full
            bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors
            pt-12 sm:pt-20
          `}
        >
          <Routes>
            <Route path="/" element={<Home onLoginSuccess={function (): void { throw new Error("Function not implemented.") }} />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/cadastro-cliente" element={<ClienteCadastro />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
            <Route path="/cadastro-os" element={<PesquisaView />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/minhas-vendas" element={<MinhasVendas />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/fornecedores" element={<FornecedorList />} />
            <Route path="/tipos" element={<TipoList />} />
            <Route path="/estilos" element={<EstiloList />} />
            <Route path="/tipos-unitarios" element={<TipoUnitarioList />} />
            <Route path="/caixa" element={<Caixa
              dados={[]}
              saldo={0}
              saldoTotal={0}
              paginaAtual={1}
              totalPaginas={1}
              onPageChange={() => { }}
              onVisualizarMesAnterior={() => { }}
              onFecharCaixa={() => { }}
              messages={[]}
            />} />
            <Route path="/caixa-mes" element={<VisualizarMesAnterior />} />
            {/* Rota para adicionar caixa, renderiza Caixa e o modal AdicionarCaixa */}
            <Route path="/caixa/adicionar" element={
              <>
                <Caixa
                  dados={[]}
                  saldo={0}
                  saldoTotal={0}
                  paginaAtual={1}
                  totalPaginas={1}
                  onPageChange={() => { }}
                  onVisualizarMesAnterior={() => { }}
                  onFecharCaixa={() => { }}
                  messages={[]}
                />
                <AdicionarCaixa onClose={() => navigate("/caixa")} />
              </>
            } />
            <Route path="/folha-pagamento" element={<FolhaPagamento />} />
            <Route path="/comissao" element={<ComissaoList />} />
            <Route path="/comissao/create" element={<ComissaoForm />} />
            <Route path="/comissao/:id" element={<ComissaoDetail />} />
            <Route path="/comissao/:id/edit" element={<ComissaoForm />} />
            <Route path="/comissao/:id/delete" element={<ComissaoDelete />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App
