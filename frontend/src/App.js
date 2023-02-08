import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from './pages/Calendar'
import Navbar from "./components/Navbar/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <Navbar/>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<Calendar />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
