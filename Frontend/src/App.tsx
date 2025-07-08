import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Components/Sidebar/Sidebar"
import Home from "./Components/Home/Home"
import Clientes from "./Components/Cliente/ClienteList"
import ClienteCadastro from "./Components/Cliente/ClienteCadastro"
import ClienteDetalhe from "./Components/Cliente/ClienteDetalhe"
import Navbar from "./Components/Navbar/Navbar"
import Pesquisa from "./Components/Pesquisa/PesquisaList";
import PesquisaView from "./Components/Pesquisa/PesquisaView";
import Kanban from "./Components/Kanban/Kanban";
import Relatorios from "./Components/Relatorios/Relatorios";
import useIsKanbanRoute from "./hooks/useIsKanbanRoute";
import Estoque from "./Components/Estoque/Estoque";
import FornecedorList from "./Components/Estoque/FornecedorList";
import TipoList from "./Components/Estoque/TipoList";
import EstiloList from "./Components/Estoque/EstiloList";
import TipoUnitarioList from "./Components/Estoque/TipoUnitarioList";
import Caixa from "./Components/Caixa/CaixaList";
import VisualizarMesAnterior from "./Components/Caixa/VisualizarMesAnterior";
import AdicionarCaixa from "./Components/Caixa/AdicionarCaixa";
import { ThemeProvider } from "./ThemeContext/ThemeProvider";
import MinhasVendas from "./Components/MinhasVendas/MinhasVendas";
import FolhaPagamento from "./Components/FolhadePagamento/FolhaPagamento";
import RealizaPagamento from "./Components/RealizarPagamento/RealizaPagamento";
import ComissaoForm from "./Components/RealizarPagamento/ComissaoForm";
import ComissaoDetail from "./Components/RealizarPagamento/ComissaoDetail";
import ComissaoDelete from "./Components/RealizarPagamento/ComissaoDelete";
import { ToastProvider } from "./Components/ui/ToastContext";
import VendedoresMesAnterior from "./Components/Relatorios/VendedoresMesAnterior";
import ClienteCadastroOs from "./Components/Cliente/ClienteCadastroOs";
import { mockOS } from "./Components/Pesquisa/mockOS"
import { mockCaixa } from "./Components/Caixa/mockCaixa";
import ServicosCadastro from "./Components/Cliente/ServicosCadastro";
import LaboratorioCadastro from "./Components/Cliente/LaboratorioCadastro";

const App: React.FC = () => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false); // desktop
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false); // mobile
  const isKanban = useIsKanbanRoute();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarMinimized(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Alterna menu lateral: mobile abre drawer, desktop minimiza
  const handleSidebarToggle = () => {
    if (window.innerWidth < 768) {
      setSidebarMobileOpen((prev) => !prev);
    } else {
      setSidebarMinimized((prev) => !prev);
    }
  };

  // Minimiza menu mobile ao clicar em item
  const handleSidebarMobileClose = () => setSidebarMobileOpen(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <Navbar
          onMinimizeSidebar={handleSidebarToggle}
          minimized={sidebarMinimized}
          fullWidth={sidebarMinimized && isKanban}
        />
        <div className={`flex min-h-screen ${sidebarMinimized && isKanban ? '' : (sidebarMinimized ? 'md:pl-20' : 'md:pl-64')} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200`}
          style={{ overflowX: 'hidden' }}
        >
          {/* Sidebar desktop */}
          <div className="hidden md:block">
            <Sidebar minimized={sidebarMinimized} hideWhenMinimizedOnKanban={isKanban} />
          </div>
          {/* Sidebar mobile como drawer/overlay, apenas ícones */}
          {sidebarMobileOpen && (
            <div className="fixed inset-0 z-40 flex md:hidden">
              {/* Overlay escuro */}
              <div className="fixed inset-0 bg-black bg-opacity-40" onClick={handleSidebarMobileClose} aria-label="Fechar menu" />
              {/* Drawer lateral só com ícones */}
              <div className="relative w-16 max-w-full h-full bg-white dark:bg-gray-900 shadow-lg z-50 animate-slideInLeft flex flex-col">
                <Sidebar minimized={true} onItemClick={handleSidebarMobileClose} showCloseButton onClose={handleSidebarMobileClose} />
              </div>
            </div>
          )}
          <main
            className={
              `flex-1 flex flex-col w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors pt-12 sm:pt-20`
            }
            style={{ minHeight: '100vh', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Rotas */}
            <Routes>
              <Route path="/" element={<Home onLoginSuccess={function (): void { throw new Error("Function not implemented.") }} />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/cadastro-cliente" element={<ClienteCadastro />} />
              <Route path="/cliente/:id" element={<ClienteDetalhe />} />
              <Route path="/pesquisa" element={<Pesquisa />} />
              <Route path="/cadastro-os" element={<PesquisaView VISUALIZAR_OS={mockOS} />} />
              <Route path="/cadastro-os/novo" element={<ClienteCadastroOs />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/fornecedores" element={<FornecedorList />} />
              <Route path="/tipos" element={<TipoList />} />
              <Route path="/estilos" element={<EstiloList />} />
              <Route path="/tipos-unitarios" element={<TipoUnitarioList />} />
              <Route path="/caixa" element={<Caixa {...mockCaixa} />} />
              <Route path="/caixa-mes" element={<VisualizarMesAnterior />} />
              <Route path="/caixa/adicionar" element={<AdicionarCaixa onClose={() => window.history.back()} />} />
              <Route path="/minhas-vendas" element={<MinhasVendas />} />
              <Route path="/folha-pagamento" element={<FolhaPagamento />} />
              <Route path="/realizar-pagamento" element={<RealizaPagamento />} />
              <Route path="/comissao/nova" element={<ComissaoForm />} />
              <Route path="/comissao/:id" element={<ComissaoDetail />} />
              <Route path="/comissao/:id/delete" element={<ComissaoDelete />} />
              <Route path="/vendedores-mes-anterior" element={<VendedoresMesAnterior />} />
              <Route path="/relatorio_mes_anterior" element={<VendedoresMesAnterior />} />
              <Route path="/servicos-cadastro" element={<ServicosCadastro />} />
              <Route path="/laboratorio-cadastro" element={<LaboratorioCadastro />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App
