import React from 'react';
import "./index.css";

const DropDownSelect = ({ name, required, val, handleChange, optionCurrText, setCurrOptionText, addDropdownOptions }) => (
  <div>
    <div class="custom-select">
    <select className="select-box" name={name} value={name} required={required} onChange={handleChange}>
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
        name={optionCurrText}
        value={optionCurrText}
        required={true}
        autoComplete="off"
        onChange={(e)=>setCurrOptionText(e.currentTarget.value)}
    />
    <button className='add add1' onClick={(e) => addDropdownOptions(e)}>Add Options</button>
    </div>)}

  </div>
);

export default DropDownSelect;

