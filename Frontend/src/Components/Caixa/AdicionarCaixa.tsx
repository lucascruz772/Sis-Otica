// AdicionarCaixa.tsx
// Tela/formulário para adicionar movimentações ao caixa.
// Permite lançar entradas/saídas financeiras.
// Usa mock data, responsivo, dark mode e fonte Inter.
//
// Props:
// - onClose: função chamada ao fechar o modal/formulário.
//
// Responsividade garantida com Tailwind: modal centralizado, largura máxima (max-w), padding adaptativo e grid responsivo.
// Certifique-se de que o formulário se adapta bem em telas pequenas.

import React, { useState } from 'react';

interface AdicionarCaixaProps {
    onClose: () => void;
}

const formasPagamento = [
    { value: 'A', label: 'Pix' },
    { value: 'B', label: 'Dinheiro' },
    { value: 'C', label: 'Débito' },
    { value: 'D', label: 'Crédito' },
    { value: 'E', label: 'Carnê' },
    { value: 'F', label: 'Permuta' },
];

const tipos = [
    { value: 'E', label: 'Entrada' },
    { value: 'S', label: 'Saída' },
];

const AdicionarCaixa: React.FC<AdicionarCaixaProps> = ({ onClose }) => {
    const [form, setForm] = useState({
        data: new Date().toISOString().split('T')[0],
        os: '',
        valor: '',
        forma: 'A',
        tipo: 'E',
        descricao: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de envio
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
                <h2 className="text-xl font-bold mb-4 text-center">Cadastro Caixa</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-sm font-medium mb-1">Data</label>
                            <input
                                className="form-input w-full bg-white !bg-white dark:!bg-white rounded px-3 py-2 text-black"
                                type="date"
                                name="data"
                                value={form.data}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-sm font-medium mb-1">Pesquisa OS</label>
                            <input className="form-input w-full rounded px-3 py-2 text-black" type="text" name="os" value={form.os} onChange={handleChange} placeholder="OS" />
                        </div>
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-sm font-medium mb-1">Valor</label>
                            <input className="form-input w-full rounded px-3 py-2 text-black" type="text" name="valor" value={form.valor} onChange={handleChange} placeholder="0,00" required />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-sm font-medium mb-1">Forma Pagamento</label>
                            <select className="form-select w-full rounded px-3 py-2 text-black" name="forma" value={form.forma} onChange={handleChange} required>
                                {formasPagamento.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-sm font-medium mb-1">Tipo</label>
                            <select className="form-select w-full rounded px-3 py-2 text-black" name="tipo" value={form.tipo} onChange={handleChange} required>
                                {tipos.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea className="form-textarea w-full rounded px-3 py-2 text-black" name="descricao" value={form.descricao} onChange={handleChange} rows={3} required />
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow">Finalizar</button>
                        <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded" onClick={onClose}>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdicionarCaixa;
