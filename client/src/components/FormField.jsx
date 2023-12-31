import React, { useState } from "react";
import "./FormField.css";

const FormField = ({ fieldUser, onChange, formData }) => {
    const capitalize = (fieldUser) => {
        if (!fieldUser) return "";

        const start = fieldUser.charAt(0).toUpperCase();
        const finish = fieldUser.slice(1).toLowerCase();

        return start + finish;
    };
    return (
        <div className="unit">
            <label>{capitalize(fieldUser)}:</label>
            <input type="text" onChange={(e) => onChange(fieldUser, e.target.value)} value={formData[fieldUser] || ""}/>
        </div>
    );
};

export default FormField;
