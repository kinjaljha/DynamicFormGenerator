import React from 'react';

const DropDownSelect = ({ name, placeholder, required, val, handleChange }) => (
  <div>
    <label>{placeholder}</label>
    <select name={name} required={required} onChange={handleChange}>
      {/* <option value=''>Select an option</option> */}
      {val.map((values) => (
        <option value={values} key={values}>
          {values}
        </option>
      ))}
    </select>
  </div>
);

export default DropDownSelect;
