import React, { useState } from "react";
import FormField from "./FormField";
import "./Login.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const initialState = {
        user: "augustin_cileanu.professor.ase.ro",
        password: "12345",
    };
    const [formData, setFormData] = useState(initialState);

    const handleFormFieldChange = (fieldUser, value) => {
        const modifiedForm = {
            ...formData,
            [fieldUser]: value,
        };
        setFormData(modifiedForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const condition = formData.user !== "" && formData.password !== "";
        if (condition) {
            try {
                const transferData = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                };
                const response = await fetch("/api/login", transferData);

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

    return (
        <div className="container">
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

            <button onClick={(e) => handleSubmit(e)}>Authenticate</button>
        </div>
    );
};

export default Login;
