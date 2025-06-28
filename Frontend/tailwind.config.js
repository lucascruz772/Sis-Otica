/** @type {import('tailwindcss').Config} */
// Configuração do Tailwind CSS para o projeto.
// Define a fonte padrão como 'Inter' (font-sans) e ativa dark mode via classe.
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
