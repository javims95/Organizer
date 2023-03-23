import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from './pages/Home/Home'
import Calendar from './components/Calendar/Calendar'
import SignUp from './pages/SignUp/SignUp';

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <Navbar/>
            </header>
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/registro" element={<SignUp />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
