import React from 'react';
import './index.css';

const RadioGroup = (props) => {
  // const { selectedValue, handleClick, handleSubmit, radios } = props;
  const { name, handleRadio, radios, selectedRadio, radioText, addRadioOptions, setCurrRadioText, radioQuestion, setRadioQuestion } = props;
  return (
    <div>
      <div>
        <div className='radio-holder'>
          {radios.map((radio, idx) => (
            <div className='radio-container'>
              <input type='radio' value={idx} name={name} key={idx} onChange={handleRadio} />
              <label>{radio}</label>
            </div>
          ))}
        </div>
        <br />
        <input
          type='text'
          placeholder='Add Radio Question'
          name={radioQuestion}
          required={true}
          autoComplete='off'
          value={radioQuestion}
          onChange={setRadioQuestion}
        />
        <div className='radio-add-container'>
          <div className='radio-add-input-holder'>
            <input
              type='text'
              placeholder='Add Radio'
              name={radioText}
              required={true}
              autoComplete='off'
              value={radioText}
              onChange={(e) => setCurrRadioText(e.currentTarget.value)}
            />
          </div>
          <button className='add add1' onClick={addRadioOptions}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadioGroup;
