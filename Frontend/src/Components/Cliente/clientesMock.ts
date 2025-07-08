import type { ClienteForm } from "./ClienteList";

// Exporta o mock para uso em outros componentes
export const clientesMock: ClienteForm[] = [
  {
    id: 1,
    nome: "Vitor Teste",
    email: "vitor@gmail.com",
    telefone: "(00) 00000-0000",
    cpf: "000.000.000-00",
    dataNascimento: "",
    cep: "",
    logradouro: "Rua Exemplo",
    numero: "154",
    bairro: "Belvedere",
    cidade: "Ribeirão das Neves",
  },
  ...Array.from({ length: 50 }, (_, i) => {
    const nomes = [
      "Ana Souza",
      "Carlos Silva",
      "Maria Oliveira",
      "João Santos",
      "Paula Lima",
      "Rafael Costa",
      "Juliana Dias",
      "Lucas Pereira",
      "Amanda Costa",
      "Fábio Silva",
      "Gabriela Ramos",
      "Bruno Teixeira",
      "Larissa Gomes",
      "Eduardo Pires",
      "Sofia Castro",
      "Pedro Lima",
      "Isabela Martins",
      "Renato Alves",
      "Tiago Rocha",
      "Camila Faria",
    ];
    const bairros = [
      "Centro",
      "Savassi",
      "Funcionários",
      "Santa Efigênia",
      "Sion",
      "Serra",
      "Anchieta",
      "Carmo",
      "Luxemburgo",
      "Prado",
    ];
    const cidades = [
      "Belo Horizonte",
      "Contagem",
      "Betim",
      "Nova Lima",
      "Ribeirão das Neves",
    ];
    const nome = nomes[i % nomes.length];
    const bairro = bairros[i % bairros.length];
    const cidade = cidades[i % cidades.length];
    return {
      id: i + 2,
      nome,
      email: `${nome.toLowerCase().replace(/ /g, ".")}@exemplo.com`,
      telefone: `(31) 9${(9000 + i).toString().padStart(4, "0")}-${(1000 + i)
        .toString()
        .padStart(4, "0")}`,
      cpf: `${(100 + i).toString().padStart(3, "0")}.${(200 + i)
        .toString()
        .padStart(3, "0")}.${(300 + i).toString().padStart(3, "0")}-0${i % 10}`,
      dataNascimento: "",
      cep: "",
      logradouro: `Rua ${String.fromCharCode(65 + (i % 26))} ${i + 10}`,
      numero: `${100 + i}`,
      bairro,
      cidade,
    };
  }),
];
