import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Components/Sidebar/Sidebar"
import Home from "./Components/Home/Home"
import Clientes from "./Components/Cliente/ClienteList"
import ClienteCadastro from "./Components/Cliente/ClienteCadastro"
import Navbar from "./Components/Navbar/Navbar"
import Pesquisa from "./Components/Pesquisa/Pesquisa";

const App: React.FC = () => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  return (
    <>
      <Navbar
        onMinimizeSidebar={() => setSidebarMinimized((prev) => !prev)}
        minimized={sidebarMinimized}
      />
      <div className="flex min-h-screen">
        <Sidebar minimized={sidebarMinimized} />
        <main
          className={`
            flex-1 flex flex-col min-h-screen w-full
            bg-gray-50 dark:bg-gray-900 transition-colors
            pt-20
          `}
          style={{
            marginLeft: sidebarMinimized ? "80px" : "256px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home onLoginSuccess={function (): void {
              throw new Error("Function not implemented.")
            }} />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/cadastro-cliente" element={<ClienteCadastro />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
