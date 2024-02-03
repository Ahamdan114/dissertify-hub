import React, { useState } from "react";
import FormField from "./FormField";
import "./Login.css";

import { useNavigate } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";
const Login = () => {
    const navigate = useNavigate();
    const initialState = {
        user: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialState);
    const [hasIntroduced, setHasIntroduced] = useState(false);
    const handleFormFieldChange = (fieldUser, value) => {
        const modifiedForm = {
            ...formData,
            [fieldUser]: value,
        };
        setFormData(modifiedForm);
        viewUser();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const checkData = formData.user !== "" && formData.password !== "";
        if (checkData) {
            try {
                const transferData = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                };
                const response = await fetch("/api/login", transferData).catch((err) =>
                    console.warn(err)
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                    console.log(data.data);

                    localStorage.setItem("user", JSON.stringify(data));
                    setFormData(initialState);
                    navigate("/home");
                }
            } catch (err) {
                console.warn(err);
            }
        } else console.log("Invalid data");
    };

    const viewUser = () => {
        const formDataArr = formData.user.split(".")[0];
        console.log(formData.user.split("."));
        if (formDataArr.length > 0) setHasIntroduced(true);
        else setHasIntroduced(false);
    };

    return (
        <div className="container">
            <ThemeChanger />
            {hasIntroduced && <div>Hello {formData.user.split(".")[0]}</div>}
            <form className="content">
                <FormField
                    className="unit"
                    fieldUser={"user"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />
                <FormField
                    className="unit"
                    fieldUser={"password"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />
            </form>

            <button className="btn-login" onClick={(e) => handleSubmit(e)}>
                Authenticate
            </button>
        </div>
    );
};

export default Login;
