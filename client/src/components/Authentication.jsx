import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Authentication.css";

const Authentication = () => {
    const navigate = useNavigate();

    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkUserPattern = (userStr) => {
        // pattern professor: augustin_cileanu.professor.ase.ro
        // pattern student: madalin_trandafir.student.ase.ro

        const parts = userStr.split(".");
        if (parts.length !== 4) return false;
        const [name, type, domain, extension] = parts;
        const patternType = isStudent ? "student" : "professor";

        if (domain !== "ase" || extension !== "ro" || type !== patternType) return false;
        return true;
    };

    const resetConfigurations = () => {
        setIsVisiblePass(false);
        setIsVisibleConfirmPass(false);
        setIsStudent(false);

        setUser("");
        setPassword("");
        setConfirmPassword("");
    };

    const authenticateUser = async (e) => {
        e.preventDefault();

        const allFields = user !== "" || password !== "" || confirmPassword !== "";
        const checkPassword = password === confirmPassword;
        const checkUser = checkUserPattern(user);
        const checkAll = allFields && checkPassword && checkUser;
        if (!checkAll) return; // "Invalid data"
        try {
            const data = { user, password };
            const response = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            resetConfigurations();

            return !!Object.keys(responseData).length;
        } catch (err) {
            console.warn(err);
        }
    };

    const authenticateSubmit = async (e) => {
        e.preventDefault();

        const dataValidation = await authenticateUser(e);
        if (!dataValidation) return; // "Invalid data"

        const data = { user, password };
        const transferData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("/api/login", transferData);
            const responseData = await response.json();

            localStorage.setItem("user", JSON.stringify(responseData));
            navigate("/home");
        } catch (err) {
            console.warn(err);
        }
    };

    const redirectLogin = () => {
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <form className="formContainer">
                <div className="from-container-introduction">
                    <h1 className="from-container-title">Welcome to Dissertify-Hub</h1>
                    <p className="from-container-description">The place where a dissertation becomes everytime a possibility</p>
                </div>

                <div className="form-input">
                    <label>{isStudent ? "Student" : "Professor"}</label>
                    <input
                        className="form-input-checkbox"
                        id="checkbox_user"
                        checked={isStudent}
                        type="radio"
                        onClick={() => setIsStudent(!isStudent)}
                        onChange={() => {}}
                    />
                    <input
                        type="text"
                        placeholder={`andrei.${
                            isStudent ? "student" : "professor"
                        }.ase.ro`}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>

                <div className="form-input">
                    <label>Password</label>
                    <input
                        className="form-input-checkbox"
                        checked={isVisiblePass}
                        type="radio"
                        onClick={() => setIsVisiblePass(!isVisiblePass)}
                        onChange={() => {}}
                    />
                    <input
                        type={`${isVisiblePass ? "text" : "password"}`}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-input">
                    <label>Confirm Password</label>
                    <input
                        className="form-input-checkbox"
                        checked={isVisibleConfirmPass}
                        type="radio"
                        onClick={() => setIsVisibleConfirmPass(!isVisibleConfirmPass)}
                        onChange={() => {}}
                    />
                    <input
                        type={`${isVisibleConfirmPass ? "text" : "password"}`}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="auth-options">
                    <div className="auth-submit">
                        <button
                            className="auth-submit-btn"
                            onClick={(e) => authenticateSubmit(e)}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="auth-redirection">
                        <p>Already have an account?</p>
                        <button className="auth-redirection-btn" onClick={redirectLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Authentication;
