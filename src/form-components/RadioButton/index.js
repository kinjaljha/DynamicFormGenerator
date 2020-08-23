import React, { useState } from 'react';
import "./index.css";

const RadioGroup = (props) => {
  // const { selectedValue, handleClick, handleSubmit, radios } = props;
  const { name, handleRadio, radios, selectedRadio, radioText, addRadios, setCurrRadioText } = props;
  return (
    <div >
      <div>
      <div className="radio-holder">
        {radios.map((radio, idx) => (
          <div className="radio-container">
            
            <input type='radio' value={idx} name={name} key={idx} onChange={handleRadio} />
            <label>{radio}</label>
          </div>
        ))}
      </div>

      <br />
      {/* <input type='button' onClick={addRadios} ></input> */}
      <input 
            type="text"
            name={radioText}
            required={true}
            autoComplete="off"
            onChange={(e)=>setCurrRadioText(e.currentTarget.value)}
        />
      <button onClick={addRadios}>Add</button>
    </div>
    </div>
  );
};

export default RadioGroup;
