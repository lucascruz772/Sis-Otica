import { useMemo } from "react";

// Mock de autenticação para controle de perfil
export function useAuth() {
  // Em produção, troque por contexto real de autenticação
  const usuario = useMemo(
    () => ({
      nome: "Gerente Mock",
      perfil: "gerente", // ou "padrao"
      otica: "Ótica Central", // Adicionado para uso automático em formulários
      // outros dados se necessário
    }),
    []
  );

  return {
    usuario,
    isGerente: usuario.perfil === "gerente",
  };
}
