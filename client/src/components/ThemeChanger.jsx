import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import "./ThemeChanger.css";
const ThemeChanger = () => {
    const [darkTheme, setdarkTheme] = useState(false)

    return (
        <div className="theme" onClick={() => setdarkTheme(!darkTheme)}>
            {darkTheme ? <CiLight /> : <MdDarkMode />}
        </div>
    );
};

export default ThemeChanger;
