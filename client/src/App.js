import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";


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
