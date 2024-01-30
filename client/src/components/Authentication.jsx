import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Authentication.css";
import FormField from "./FormField";

const Authentication = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [form, setForm] = useState({
        user: "",
        password: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const onChange = (fieldUser, value) => {
        const modifiedForm = {
            ...form,
            [fieldUser]: value,
        };
        setForm(modifiedForm);
    };

    const authenticationSubmit = async (e) => {
        e.preventDefault();
        const { user, password } = form;

        const allFields = user !== "" || password !== "" || confirmPassword !== "";
        const checkPassword = password === confirmPassword;

        if (allFields && checkPassword) {
            try {
                const data = { ...form.user, ...form.password };
                console.log(data);
                const response = await fetch("/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    localStorage.setItem("user", JSON.stringify(responseData));

                    setIsVisible(false);
                    setIsStudent(false);
                    setForm({ user: "", password: "" });
                    navigate("/home");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            console.log("Invalid data");
        }
    };

    const redirectLogin = () => {
        navigate("/login");
    };
    return (
        <>
            <div>
                <form action="">
                    <FormField
                        className="unit"
                        fieldUser={"User"}
                        onChange={onChange}
                        formData={form}
                    />
                    <FormField
                        className="unit"
                        fieldUser={"Password"}
                        onChange={onChange}
                        formData={form}
                    />
                    <div>
                        <FormField
                            className="unit"
                            fieldUser={"Confirm Password"}
                            onChange={onChange}
                            formData={form}
                        />
                        <button onClick={() => setIsVisible(!isVisible)}></button>
                    </div>
                </form>
            </div>
            <div>
                <div className="form-description">
                    <div className="auth-form-button">
                        <button type="submit" onClick={(e) => authenticationSubmit(e)}>
                            Sign in {isStudent ? "Student" : "Professor"}
                        </button>
                    </div>
                    <div className="auth-form-login">
                        <p className="auth-form-login-description">
                            Already have an account?
                        </p>
                        <button type="submit" onClick={redirectLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Authentication;

{
    /* <div className="auth-form">
            <div className="auth-form-header">
                <h1>Sign in {isStudent ? "Student" : "Professor"}</h1>
            </div>
            <div className="auth-form-body">
                <form>
                    <div className="auth-form-field">
                        <label htmlFor="email">User</label>
                        <input
                            type="text"
                            placeholder={`augustin_cileanu.${
                                isStudent ? "Student" : "Professor"
                            }.ase.ro`}
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
                <div className="form-description">
                    <div className="auth-form-button">
                        <button type="submit" onClick={(e) => authenticationSubmit(e)}>
                            Sign in {isStudent ? "Student" : "Professor"}
                        </button>
                    </div>
                    <div className="auth-form-login">
                        <p className="auth-form-login-description">
                            Already have an account?
                        </p>
                        <button type="submit" onClick={redirectLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div> */
}
