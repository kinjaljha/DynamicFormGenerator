import React from "react";

const InputTextField = ({name, placeholder, required, handleChange}) => (
    <div>
        <input 
            type="text"
            name={name}
            required={required}
            autoComplete="off"
            placeholder={placeholder}
            onChange={handleChange}
        />
    </div>
)

export default InputTextField;