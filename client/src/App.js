import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import { light, dark } from "./components/themes";
import Login from "./components/Login";
import Home from "./components/Home";
import Favicon from "./components/Favicon";
import "./components/App.css";
import { createContext } from "react";
const ThemeContext = createContext();

const App = () => {
    return (
        <ThemeContext.Provider value={{ light, dark }}>
            <Favicon />
            <Browser>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Browser>
        </ThemeContext.Provider>
    );
};

export default App;
