import React, { useState } from "react";

const Home: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode fazer a requisição de login
        alert(`Usuário: ${username}\nSenha: ${password}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide uppercase border-b-4 border-blue-400 pb-2">
                        LOGAR
                    </h1>
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="username"
                    >
                        Usuário
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        name="username"
                        placeholder="Digite seu usuário"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="mb-8">
                    <label
                        className="block text-gray-700 font-semibold mb-2"
                        htmlFor="password"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        name="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>
                <input
                    type="submit"
                    value="Logar"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-cyan-500 transition mb-4 cursor-pointer"
                />
                <a
                    className="block text-center text-sm text-blue-600 hover:underline"
                    href="/password-reset"
                >
                    Esqueceu sua senha?
                </a>
            </form>
        </div>
    );
};

export default Home;