import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from './pages/Home/Home'
import Calendar from './pages/Calendar'

export default function App() {
    return (
        <BrowserRouter>
            <header>
                {/* <Navbar/> */}
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
