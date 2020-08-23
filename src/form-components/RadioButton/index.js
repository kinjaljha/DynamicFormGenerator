import React, { useState } from 'react';

const RadioGroup = (props) => {
  // const { selectedValue, handleClick, handleSubmit, radios } = props;
  const { name, handleRadio, radios, selectedRadio, addRadios } = props;
  return (
    <div>
      <div>
        {radios.map((radio, idx) => (
          <div>
            <label>{radio}</label>
            <input type='radio' value={idx} name={name} key={idx} onChange={handleRadio} />
          </div>
        ))}
      </div>

      <br />
      {/* <input type='button' onClick={addRadios} ></input> */}
      <button onClick={(e) => addRadios(e)}>Add</button>
    </div>
  );
};

export default RadioGroup;
