import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Components/Sidebar/Sidebar"
import Home from "./Components/Home/Home"
import Clientes from "./Components/Cliente/ClienteList"
import ClienteCadastro from "./Components/Cliente/ClienteCadastro"
import Navbar from "./Components/Navbar/Navbar"
import Pesquisa from "./Components/Pesquisa/Pesquisa";
import PesquisaView from "./Components/Pesquisa/PesquisaView";

const App: React.FC = () => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  useEffect(() => {
    // Minimiza o menu se a tela for menor que 768px (mobile)
    if (window.innerWidth < 768) {
      setSidebarMinimized(true);
    }
  }, []);

  return (
    <>
      <Navbar
        onMinimizeSidebar={() => setSidebarMinimized((prev) => !prev)}
        minimized={sidebarMinimized}
      />
      <div className={`flex h-screen ${sidebarMinimized ? 'md:pl-20' : 'md:pl-64'}`}>
        <Sidebar minimized={sidebarMinimized} />
        <main
          className={`
            flex-1 flex flex-col w-full
            bg-gray-50 dark:bg-gray-900 transition-colors
            pt-20
          `}
        >
          <Routes>
            <Route path="/" element={<Home onLoginSuccess={function (): void {
              throw new Error("Function not implemented.")
            }} />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/cadastro-cliente" element={<ClienteCadastro />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
            <Route path="/cadastro-os" element={<PesquisaView />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
