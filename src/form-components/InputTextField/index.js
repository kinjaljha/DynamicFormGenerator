import React from "react";

const InputTextField = ({name, required, handleChange}) => (
    <div>
        <input 
            type="text"
            name={name}
            required={required}
            autoComplete="off"
            onChange={handleChange}
        />
    </div>
)

export default InputTextField;