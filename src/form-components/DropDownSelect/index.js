import React from 'react';
import "./index.css";

const DropDownSelect = ({ name, required, val, handleChange, optionText, setCurrOptionText, addDropdownOptions }) => (
  <div>
    <div class="custom-select">
    <select className="select-box" name={name} value={name} required={required} onChange={handleChange}>
      {/* <option value=''>Select an option</option> */}
      {val.map((values) => (
        <option value={values} key={values}>
          {values}
        </option>
      ))}
    </select>
    </div>
    { ['static', 'text', 'dropdown', 'radio'].includes(name) ? 
      null : ( 
        <div>     
      <input 
        type="text"
        name={optionText}
        required={true}
        autoComplete="off"
        onChange={(e)=>setCurrOptionText(e.currentTarget.value)}
    />
    <button onClick={(e) => addDropdownOptions(e)}>Add Options</button>
    </div>)}

  </div>
);

export default DropDownSelect;
