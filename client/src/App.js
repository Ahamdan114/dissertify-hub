import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import {light} from './components/themes'
import Login from "./components/Login";
import Home from "./components/Home";
import "./components/App.css"


const App = () => {
    return (
            <Browser>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Browser>
    );
};

export default App;
