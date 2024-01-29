import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Authentication.css";

const Authentication = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const authenticationSubmit = async (e) => {
        e.preventDefault();
        const allFields = user !== "" || password !== "" || confirmPassword !== "";
        const checkPassword = password === confirmPassword;
        if (allFields && checkPassword) {
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
                if (response.ok) {
                    const responseData = await response.json();

                    navigate("/home");
                }
            } catch (err) {
                console.warn(err);
            }
        }

        // navigate("/home");
    };
    return (
        <>
            <div className="auth-container">
                <div className="auth-form">
                    <div className="auth-form-header">
                        <h1>Sign in</h1>
                    </div>
                    <div className="auth-form-body">
                        <form>
                            <div className="auth-form-field">
                                <label htmlFor="email">User</label>
                                <input
                                    type="text"
                                    placeholder="Enter user..."
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </div>
                            <div className="auth-form-field">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Enter password..."
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="auth-form-field">
                                <label htmlFor="password">Confirm password</label>
                                <input
                                    type={`${isVisible ? "text" : "password"}`}
                                    value={confirmPassword}
                                    placeholder="Enter password..."
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button onClick={() => setIsVisible(!isVisible)}>
                                    Make it visible
                                </button>
                            </div>
                        </form>
                        <div className="auth-form-button">
                            <button
                                type="submit"
                                onClick={(e) => authenticationSubmit(e)}
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="auth-form-login">
                            <p className="auth-form-login-description">
                                Already have an account? Login
                            </p>
                            <button
                                type="submit"
                                onClick={(e) => authenticationSubmit(e)}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Authentication;
