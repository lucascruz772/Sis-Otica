import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { Table } from "./Table";
import { Spinner } from "./Spinner";
import { Skeleton } from "./Skeleton";
import { useToast } from "./ToastContext";

const UIDemo: React.FC = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(false);

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <h2 className="text-2xl font-bold mb-4">Exemplos de UI Reutilizável</h2>
            <div className="space-x-2">
                <Button onClick={() => showToast("Toast de sucesso!", "success")}>Toast Sucesso</Button>
                <Button variant="danger" onClick={() => showToast("Toast de erro!", "error")}>Toast Erro</Button>
                <Button variant="outline" onClick={() => showToast("Toast informativo!", "info")}>Toast Info</Button>
            </div>
            <div className="space-x-2">
                <Button size="sm">Pequeno</Button>
                <Button size="md">Médio</Button>
                <Button size="lg">Grande</Button>
                <Button loading>Carregando</Button>
            </div>
            <div className="space-y-2">
                <label htmlFor="input-padrao" className="sr-only">Input padrão</label>
                <Input id="input-padrao" placeholder="Input padrão" />
                <label htmlFor="input-pequeno" className="sr-only">Input pequeno</label>
                <Input id="input-pequeno" placeholder="Input pequeno" size={undefined} />
                <label htmlFor="input-grande" className="sr-only">Input grande</label>
                <Input id="input-grande" placeholder="Input grande" />
            </div>
            <div className="space-y-2">
                <Select defaultValue="">
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="1">Opção 1</option>
                    <option value="2">Opção 2</option>
                </Select>
                <Select><option>Pequeno</option></Select>
                <Select><option>Grande</option></Select>
            </div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nome</th>
                            <th className="px-4 py-2">Idade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2">João</td>
                            <td className="px-4 py-2">30</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Maria</td>
                            <td className="px-4 py-2">25</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="flex items-center space-x-4">
                <Button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}>Mostrar Spinner</Button>
                {loading && <Spinner size={32} />}
            </div>
            <div className="flex items-center space-x-4">
                <Button onClick={() => { setShowSkeleton(true); setTimeout(() => setShowSkeleton(false), 2000); }}>Mostrar Skeleton</Button>
                {showSkeleton ? <Skeleton width={120} height={32} /> : <span>Conteúdo carregado</span>}
            </div>
        </div>
    );
};

export default UIDemo;
