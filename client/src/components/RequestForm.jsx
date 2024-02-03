import { useState } from "react";
import FormField from "./FormField";
import "./RequestForm.css";

const RequestForm = ({ callback = () => {} }) => {
    const [formData, setFormData] = useState({
        studentName: "",
        professorName: "",
        title: "",
        description: "",
    });

    const handleFormFieldChange = (fieldUser, value) => {
        const modifiedForm = {
            ...formData,
            [fieldUser]: value,
        };
        setFormData(modifiedForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const condition = Array.from(formData).every((element) => element !== "");
        if (condition) {
            try {
                const transferData = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                };
                const response = await fetch("/api/request", transferData)
                                        .catch((err) => console.warn(err));

                if (response.ok) {
                    const data = await response.json();

                    setFormData({
                        studentName: "",
                        professorName: "",
                        title: "",
                        description: "",
                    });

                    callback();
                }
            } catch (err) {
                console.warn(err);
            }
        } else console.log("Invalid data");
    };

    return (
        <>
            <form className="form-request-container">
                <FormField
                    className="unit"
                    fieldUser={"studentName"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />
                <FormField
                    className="unit"
                    fieldUser={"professorName"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />

                <FormField
                    className="unit"
                    fieldUser={"title"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />

                <FormField
                    className="unit"
                    fieldUser={"description"}
                    onChange={handleFormFieldChange}
                    formData={formData}
                />
            </form>

            <button className="btn" onClick={(e) => handleSubmit(e)}>
                Authenticate
            </button>
        </>
    );
};

export default RequestForm;
