import React from "react";
import Cliente from "../Components/Cliente/ClienteList";

// Exemplo de dados mockados para exibir na página
const clienteExemplo = {
    id: 1,
    NOME: "João da Silva",
    EMAIL: "joao@email.com",
    TELEFONE: "31999999999",
    CPF: "123.456.789-00",
    DATA_NASCIMENTO: "1990-01-01",
    CEP: "30123-456",
    LOGRADOURO: "Rua Exemplo",
    NUMERO: "123",
    BAIRRO: "Centro",
    CIDADE: "Belo Horizonte"
};

const ClientesPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <Cliente cliente={clienteExemplo} />
        </div>
    );
};

export default ClientesPage;
