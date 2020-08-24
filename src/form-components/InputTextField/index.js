import React from "react";
import "./index.css";

const InputTextField = ({name, required, charCount, setCharCount, handleChange}) => (
    <div class="text-container">
        <div class="input-container">
        <input 
            type="text"
            name={name}
            required={required}
            autoComplete="off"
            onChange={handleChange}
            maxLength={charCount}
        />
        </div>
        <div className="allowed-container">
        <label>Allowed Characters</label>
        <input 
            type="number"
            name={charCount}
            required={true}
            autoComplete="off"
            onChange={setCharCount}
        />
        </div>
    </div>
)

export default InputTextField;