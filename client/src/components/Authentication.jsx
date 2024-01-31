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

        if (domain !== "ase" || extension !== "ro") return false;
        if (type !== patternType) return false;
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

        if (allFields && checkPassword && checkUser) {
            try {
                const data = {
                    user,
                    password,
                };

                const response = await fetch("/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                console.log("Step 1");
                if (response.ok) {
                    const responseData = await response.json();
                    localStorage.setItem("user", JSON.stringify(responseData));
                    console.log("Step 2A");
                    resetConfigurations();
                    return response.ok, data;
                } else console.log("Invalid data");
            } catch (err) {
                console.warn(err);
            }
        }
        console.log("Step 2B");

        return false;
    };

    const authenticationSubmit = async (e) => {
        e.preventDefault();
        console.log("Step 3");

        const { condition, data } = await authenticateUser(e);
        console.log("Step 4", condition, data);

        console.log(data);
        if (condition) {
            try {
                const transferData = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data }),
                };
                console.log("Step 5");

                const res = await fetch("/api/login", transferData);
                console.log("Step 6");

                if (res.ok) {
                    const data = await res.json();
                    console.log(data.message);
                    console.log(data.data);
                    console.log("Step 7");

                    localStorage.setItem("user", JSON.stringify(data));
                    navigate("/home");
                }
                console.log("reached");
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const redirectLogin = () => {
        navigate("/login");
    };

    return (
        <div className="authentication-container">
            <form className="formContainer">
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
                        placeholder={`augustin_cileanu.${
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
                <div className="authentication-options">
                    <div className="authentication-submit">
                        <button
                            className="authentication-submit-btn"
                            onClick={(e) => authenticationSubmit(e)}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="authentication-redirection">
                        <p>Already have an account?</p>
                        <button
                            className="authentication-redirection-btn"
                            onClick={redirectLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Authentication;
