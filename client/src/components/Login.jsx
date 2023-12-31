import React, { useState } from "react";
import FormField from "./FormField";
import "./Login.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: "",
        password: "",
    });

    const handleFormFieldChange = (fieldUser, value) => {
        const modifiedForm = {
            ...formData,
            [fieldUser]: value,
        };
        setFormData(modifiedForm);
        console.log(modifiedForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.user !== "" && formData.password !== "") {
            try {
                const transferData = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                };
                const response = await fetch("/server/submitFormLogin", transferData);

                if (response.ok) navigate("/home");
            } catch (err) {
                console.warn(err);
            }
        } else console.log("Invalid data");
    };

    return (
        <>
            <form>
                <FormField
                    fieldUser={"user"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />
                <FormField
                    fieldUser={"password"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />
            </form>

            <button onClick={(e) => handleSubmit(e)}>Login</button>
        </>
    );
};

export default Login;
