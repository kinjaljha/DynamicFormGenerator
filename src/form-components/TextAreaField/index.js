import React from "react";

const InputAreaField = ({name, placeholder, required, handleChange, disabled}) => (
    <div>
        <input 
            type="text"
            name={name}
            required={required}
            style={{ height: "80px"}}
            autoComplete="off"
            placeholder={placeholder}
            onChange={handleChange}
            disabled={disabled}
        />
    </div>
)

export default InputAreaField;