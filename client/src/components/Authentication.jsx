import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Authentication.css";

const Authentication = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const authenticationSubmit = (e) => {
        e.preventDefault();
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
                        <form onSubmit={(e) => authenticationSubmit(e)}>
                            <div className="auth-form-field">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email..."
                                />
                            </div>
                            <div className="auth-form-field">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password..."
                                />
                            </div>
                            <div className="auth-form-field">
                                <label htmlFor="password">Confirm password</label>
                                <input
                                    type={`${isVisible ? "text" : "password"}`}
                                    id="password"
                                    name="password"
                                    placeholder="Enter password..."
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
