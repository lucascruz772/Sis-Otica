import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./Components/Sidebar/Sidebar"
import Home from "./Components/Home/Home"
import Clientes from "./Components/Cliente/ClienteList"
import Navbar from "./Components/Navbar/Navbar"

const App: React.FC = () => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  return (
    <>
      <Navbar
        onMinimizeSidebar={() => setSidebarMinimized((prev) => !prev)}
        minimized={sidebarMinimized}
      />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar minimized={sidebarMinimized} />
        <main
          style={{
            flex: 1,
            paddingTop: "80px",
            marginLeft: sidebarMinimized ? "80px" : "256px", // ajuste conforme largura da sidebar
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "#f9f9f9",
            minHeight: "100vh"
          }}
        >
          <div style={{ width: "100%", maxWidth: "1200px" }}>
            <Routes>
              <Route path="/" element={<Home onLoginSuccess={function (): void {
                throw new Error("Function not implemented.")
              }} />} />
              <Route path="/clientes" element={<Clientes />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
