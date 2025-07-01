import React, { useState } from 'react';

interface AdicionarCaixaProps {
    onClose: () => void;
    onSuccess?: () => void;
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

const AdicionarCaixa: React.FC<AdicionarCaixaProps> = ({ onClose, onSuccess }) => {
    const [data] = useState(() => new Date().toLocaleDateString('pt-BR'));
    const [valor, setValor] = useState('');
    const [forma, setForma] = useState('A');
    const [tipo, setTipo] = useState('E');
    const [descricao, setDescricao] = useState('');
    const [searchOs, setSearchOs] = useState('');
    const [referencia, setReferencia] = useState('');

    // Simulação de opções de OS
    const osOptions = [
        { value: '', label: 'Os' },
        { value: '1234', label: 'OS 1234' },
        { value: '5678', label: 'OS 5678' },
    ];

    // Máscara simples para valor (R$)
    function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
        let v = e.target.value.replace(/[^\d]/g, "");
        v = (Number(v) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        setValor(v);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (onSuccess) onSuccess();
        if (onClose) onClose(); // Fecha o form após adicionar
        // Aqui você pode integrar com backend
    }

    return (
        <div className="w-full flex justify-start items-start py-8">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg ml-0 sm:ml-8">
                <div className="text-center mb-4">
                    <label className="block text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Cadastro Caixa</label>
                </div>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-2">
                        <div className="flex-1 min-w-[90px]">
                            <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-200">Data</label>
                            <input className="form-input w-full bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded px-2 py-1 text-sm border border-gray-300 dark:border-gray-700" type="text" value={data} name="DATA" id="DATA" readOnly />
                        </div>
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-200">Pesquisa OS</label>
                            <div className="flex gap-1">
                                <input type="text" id="search_os" name="search_os" className="form-input w-1/2 rounded-l px-2 py-1 text-sm border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700" placeholder="Os" value={searchOs} onChange={e => setSearchOs(e.target.value)} />
                                <select id="os-select" name="REFERENCIA" className="form-input w-1/2 rounded-r px-2 py-1 text-sm border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700" value={referencia} onChange={e => setReferencia(e.target.value)}>
                                    {osOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[100px]">
                            <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-200">Valor</label>
                            <input required className="form-input w-full rounded px-2 py-1 text-sm border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700" maxLength={15} value={valor} onChange={handleValorChange} id="VALOR" name="VALOR" placeholder="R$ 0,00" />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-200">Forma Pagamento</label>
                            <select name="FORMA" id="FORMA" className="form-input w-full rounded px-2 py-1 text-sm border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700" value={forma} onChange={e => setForma(e.target.value)} required>
                                {formasPagamento.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 min-w-[90px]">
                            <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-200">Tipo</label>
                            <select id="TIPO" name="TIPO" className="form-input w-full rounded px-2 py-1 text-sm border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700" value={tipo} onChange={e => setTipo(e.target.value)} required>
                                {tipos.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-200">Descrição</label>
                        <textarea className="form-input w-full rounded px-2 py-1 text-sm border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700" id="DESCRICAO" name="DESCRICAO" rows={3} value={descricao} onChange={e => setDescricao(e.target.value)} required></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                        <button type="button" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded px-4 py-2 flex-1" onClick={onClose}>Fechar</button>
                        <button type="submit" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded px-4 py-2 flex-1">Finalizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdicionarCaixa;
