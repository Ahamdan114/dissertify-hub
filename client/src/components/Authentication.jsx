import React from "react";
import "./Authentication.css";

import { useNavigate } from "react-router-dom";

const Authentication = () => {
    const navigate = useNavigate();
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
                                <input type="email" id="email" name="email" />
                            </div>
                            <div className="auth-form-field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" />
                            </div>
                            <div className="auth-form-field">
                                <button type="submit" onClick={(e) => authenticationSubmit(e)}>Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Authentication;
