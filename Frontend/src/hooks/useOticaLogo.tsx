import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

interface OticaLogoContextType {
    logo: string | null;
    setLogo: (logo: string | null) => void;
}

const OticaLogoContext = createContext<OticaLogoContextType>({
    logo: null,
    setLogo: () => { },
});

export const useOticaLogo = () => useContext(OticaLogoContext);

export const OticaLogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { usuario } = useAuth();
    const oticaNome = usuario?.otica;
    const [logo, setLogoState] = useState<string | null>(null);

    // Carrega logo da ótica ativa ao iniciar ou trocar de ótica
    useEffect(() => {
        if (!oticaNome) return;
        const logosRaw = localStorage.getItem("oticaLogos");
        let logos: Record<string, string> = {};
        if (logosRaw) {
            try { logos = JSON.parse(logosRaw); } catch { logos = {}; }
        }
        setLogoState(logos[oticaNome] || null);
    }, [oticaNome]);

    // Salva logo para a ótica ativa
    const setLogo = (img: string | null) => {
        if (!oticaNome) return;
        const logosRaw = localStorage.getItem("oticaLogos");
        let logos: Record<string, string> = {};
        if (logosRaw) {
            try { logos = JSON.parse(logosRaw); } catch { logos = {}; }
        }
        if (img) logos[oticaNome] = img;
        else delete logos[oticaNome];
        localStorage.setItem("oticaLogos", JSON.stringify(logos));
        setLogoState(img);
    };

    return (
        <OticaLogoContext.Provider value={{ logo, setLogo }}>
            {children}
        </OticaLogoContext.Provider>
    );
};
