import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;