import React from "react";
import Navigation from "./components/Navigation/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <>
        <Navigation/>
            <div>
                <h1>Bienvenido a mi página de React</h1>
                <p>Este es el contenido de mi página</p>
            </div>
        </>
    );
};

export default App;
