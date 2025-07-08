import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext/themecontext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface VisualizarMesAnteriorProps {
    onClose?: () => void;
}

interface LancamentoMock {
    data: string;
    descricao: string;
    os: string;
    tipo: string;
    valor: string;
    forma: string;
}

const VisualizarMesAnterior: React.FC<VisualizarMesAnteriorProps> = ({ onClose }) => {
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [resultado, setResultado] = useState<null | string>(null);
    const [dados, setDados] = useState<LancamentoMock[]>([]);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    // Mock de lançamentos
    function gerarMockLancamentos(qtd: number) {
        const tipos = ["Entrada", "Saída"];
        const formas = ["PIX", "Débito", "Crédito", "Dinheiro", "Boleto"];
        const descricoes = [
            "Venda balcão", "Pagamento fornecedor", "Pix recebido", "Compra estoque", "Recebimento OS", "Pagamento funcionário", "Transferência", "Ajuste caixa", "Pagamento conta", "Recebimento mensalidade"
        ];
        const mocks = [];
        for (let i = 1; i <= qtd; i++) {
            const tipo = tipos[Math.floor(Math.random() * tipos.length)];
            const forma = formas[Math.floor(Math.random() * formas.length)];
            const valor = (Math.random() * 1000 + 1).toFixed(2);
            const data = new Date(2025, 5, Math.floor(Math.random() * 28) + 1);
            mocks.push({
                data: data.toLocaleDateString('pt-BR'),
                descricao: descricoes[Math.floor(Math.random() * descricoes.length)] + ` #${i}`,
                os: Math.random() > 0.5 ? String(Math.floor(Math.random() * 10000)) : "",
                tipo,
                valor: `R$ ${valor}`,
                forma,
            });
        }
        return mocks;
    }

    useEffect(() => {
        console.log('Tema atual:', theme);
    }, [theme]);

    const isDark = theme === 'dark';

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        // Simula busca e exibe mock
        const mock = gerarMockLancamentos(20);
        setDados(mock);
        setResultado(null);
    };

    return (
        <div
            className={`w-full h-full transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} pl-4 md:pl-8 lg:pl-16`}
            style={{ minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
        >
            {/* Mensagem de feedback fixa logo abaixo da navbar (caso queira exibir alguma) */}
            {resultado && resultado !== 'Nenhuma entrada nesse período.' && (
                <div className="fixed left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50" style={{ top: 88 }}>
                    {resultado}
                </div>
            )}
            <div className="max-w-5xl ml-0 mr-auto mt-10 mb-10 flex flex-col gap-4" style={{ boxSizing: 'border-box' }}>
                {/* Título com ícone de voltar alinhado à esquerda */}
                <div className="w-full flex items-center mb-4">
                    <button
                        className={`mr-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${isDark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:bg-gray-300'}`}
                        onClick={() => navigate(-1)}
                        aria-label="Voltar"
                    >
                        <FaArrowLeft className="text-xl" />
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-left">Consultar Período</h2>
                    {onClose && (
                        <button
                            className={`btn btn-secondary ml-auto px-3 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:bg-gray-400'}`}
                            onClick={onClose}
                            aria-label="Fechar"
                        >
                            Fechar
                        </button>
                    )}
                </div>
                {/* Filtros e botão alinhados horizontalmente */}
                <form onSubmit={handleBuscar} className="mb-5 w-full">
                    <div className="flex flex-wrap gap-4 items-center justify-start w-full">
                        <label htmlFor="data-inicio" className="font-medium">Data de Início:</label>
                        <input
                            id="data-inicio"
                            type="date"
                            className={`form-control px-2 py-1 rounded border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-gray-600' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-200'} w-40 md:w-48 lg:w-56`}
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            required
                            style={{ colorScheme: isDark ? 'dark' : 'light' }}
                        />
                        <label htmlFor="data-fim" className="font-medium">Data de Término:</label>
                        <input
                            id="data-fim"
                            type="date"
                            className={`form-control px-2 py-1 rounded border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-gray-600' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-200'} w-40 md:w-48 lg:w-56`}
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            required
                            style={{ colorScheme: isDark ? 'dark' : 'light' }}
                        />
                        <button
                            type="submit"
                            className={`btn btn-primary min-w-[180px] px-4 py-2 rounded ${isDark ? 'bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 text-white' : 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white'}`}
                        >
                            Baixar Relatório Conferência
                        </button>
                    </div>
                </form>
                {/* Tabela ajustada para não causar overflow vertical */}
                <div style={{ maxHeight: 'calc(100vh - 260px)', minHeight: 200, overflowY: 'auto', overflowX: 'auto' }}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <th className="p-2 font-bold text-left">Data</th>
                                <th className="p-2 font-bold text-left">Descrição</th>
                                <th className="p-2 font-bold text-left">Os</th>
                                <th className="p-2 font-bold text-left">Tipo</th>
                                <th className="p-2 font-bold text-left">Valor</th>
                                <th className="p-2 font-bold text-left">Forma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className={`p-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {resultado ? resultado : 'Nenhuma entrada nesse período.'}
                                    </td>
                                </tr>
                            ) : (
                                dados.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="p-2">{item.data}</td>
                                        <td className="p-2">{item.descricao}</td>
                                        <td className="p-2">{item.os}</td>
                                        <td className="p-2">{item.tipo}</td>
                                        <td className="p-2">{item.valor}</td>
                                        <td className="p-2">{item.forma}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VisualizarMesAnterior;