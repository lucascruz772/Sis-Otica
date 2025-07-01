import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext/themecontext';
import { useNavigate } from 'react-router-dom';

interface VisualizarMesAnteriorProps {
    onClose?: () => void;
}

const VisualizarMesAnterior: React.FC<VisualizarMesAnteriorProps> = ({ onClose }) => {
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [resultado, setResultado] = useState<null | string>(null);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Tema atual:', theme);
    }, [theme]);

    const isDark = theme === 'dark';

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        setResultado('Nenhuma entrada nesse período.');
    };

    return (
        <div className={`w-full min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <div className={`max-w-5xl mx-auto mt-10 mb-10 rounded-lg shadow-lg border p-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex justify-between items-center mb-4 relative">
                    {/* Ícone de voltar no mobile */}
                    <button
                        className={`block sm:hidden absolute left-0 top-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150
                        ${isDark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:bg-gray-300'}`}
                        style={{ position: 'static', marginRight: 'auto', marginBottom: '0.5rem' }}
                        onClick={() => navigate(-1)}
                        aria-label="Voltar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    {/* Botão Voltar textual em telas médias/grandes */}
                    <button
                        className={`hidden sm:block absolute left-0 top-2 px-3 py-1 rounded font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150
                        min-w-[90px] text-base
                        ${isDark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:bg-gray-300'}`}
                        style={{ position: 'static', marginRight: 'auto', marginBottom: '0.5rem' }}
                        onClick={() => navigate(-1)}
                        aria-label="Voltar"
                    >
                        Voltar
                    </button>
                    <h2 className="w-full text-center font-semibold text-2xl">Consultar Período</h2>
                    {onClose && (
                        <button
                            className={`btn btn-secondary absolute right-6 top-2 px-3 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:bg-gray-400'}`}
                            onClick={onClose}
                            aria-label="Fechar"
                        >
                            Fechar
                        </button>
                    )}
                </div>
                <form onSubmit={handleBuscar} className="mb-5">
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <label htmlFor="data-inicio" className="font-medium">Data de Início:</label>
                        <input
                            id="data-inicio"
                            type="date"
                            className={`form-control w-36 px-2 py-1 rounded border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-gray-600' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-200'}`}
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            required
                            style={{ colorScheme: isDark ? 'dark' : 'light' }}
                        />
                        <label htmlFor="data-fim" className="font-medium">Data de Término:</label>
                        <input
                            id="data-fim"
                            type="date"
                            className={`form-control w-36 px-2 py-1 rounded border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-gray-600' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-200'}`}
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            required
                            style={{ colorScheme: isDark ? 'dark' : 'light' }}
                        />
                        <button
                            type="submit"
                            className={`btn btn-primary ml-3 min-w-[120px] px-4 py-2 rounded ${isDark ? 'bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 text-white' : 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white'}`}
                        >
                            Obter Valores
                        </button>
                    </div>
                </form>
                <div className={`rounded-lg border overflow-x-auto ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
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
                            <tr>
                                <td colSpan={6} className={`p-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {resultado ? resultado : 'Nenhuma entrada nesse período.'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VisualizarMesAnterior;