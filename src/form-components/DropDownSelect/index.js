import React from 'react';

const DropDownSelect = ({ name, required, val, handleChange }) => (
  <div>
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
