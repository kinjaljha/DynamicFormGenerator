import React, { useState } from 'react';
import { createSchema } from '../../redux/action/schema-action';
import './index.css';
import { connect } from 'react-redux';
import {deepCopy} from '../../helpers';

import InputTextField from '../../form-components/InputTextField';
import TextAreaField from '../../form-components/TextAreaField';
import DropDownSelect from '../../form-components/DropDownSelect';
import RadioGroup from '../../form-components/RadioButton';

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const DynamicForm = (props) => {
  const [currRadioText, setCurrRadioText] = useState('');
  const [optionCurrText, setCurrOptionText] = useState('');

  
  const submitForm = (event) => {
    const { postSchema, ...inputFields } = props;
    console.log(inputFields);
    event.preventDefault();
    //Submit logic
  };
  

  const addRadioOptions = (event, index) => {

    let localSchema = deepCopy(props.postSchema);
    let idx = index.toString();
    localSchema = localSchema.reduce((acc, data) => {
      let component = deepCopy(data.component);
      if (data.key === idx) {
        component.radios.push(currRadioText);
      }
      data.component = component;
      acc.push(data);
      return acc;
    }, []);
    props.onCreateSchema(localSchema);
    setCurrRadioText('');
  };

  // TODO: Can be optimised by generalising this with above function
  const addDropdownOptions = (event, index) => {
    let localSchema = deepCopy(props.postSchema);
    let idx = index.toString();
    localSchema = localSchema.reduce((acc, data) => {
      let component = deepCopy(data.component);
      if (data.key === idx) {
        component.values.push(optionCurrText);
      }
      data.component = component;
      acc.push(data);
      return acc;
    }, []);
    props.onCreateSchema(localSchema);
    setCurrOptionText('');
  };


  const handleRadio = (event, index, name, inputType, required, radios, selectedRadio, radioText) => {
    let localSchema = deepCopy(props.postSchema);
    localSchema = localSchema.reduce((acc, data) => {
      let component = deepCopy(data.component);
      let idx = index.toString();
      if (data.key === idx) {
        component.selectedRadio = component.radios[event.currentTarget.value];
        component.input_type = inputType;
        component.required = required;
        component.radioText = radioText;
        if (radios) component.radios = radios;
      }
      data.component = component;
      acc.push(data);
      return acc;
    }, []);
    props.onCreateSchema(localSchema);
  };


  const handleCharCount = (event, index) => {
    let localSchema = deepCopy(props.postSchema);
    localSchema = localSchema.reduce((acc, data) => {
      let component = deepCopy(data.component);
      let idx = index.toString();
      if (data.key === idx) {
        component.charCount = event.currentTarget.value;
      }
      data.component = component;
      acc.push(data);
      return acc;
    }, []);
    props.onCreateSchema(localSchema);
  };


  const handleRadioQuestion = (event, index) => {
    let localSchema = deepCopy(props.postSchema);
    localSchema = localSchema.reduce((acc, data) => {
      let component = deepCopy(data.component);
      let idx = index.toString();
      if (data.key === idx) {
        component.radioText = event.currentTarget.value;
      }
      data.component = component;
      acc.push(data);
      return acc;
    }, []);
    props.onCreateSchema(localSchema);
  };


  const handleChange = (event, index, name, input_type, required, values) => {
    let localSchema = deepCopy(props.postSchema);
    localSchema = localSchema.reduce((acc, data) => {
      let component = deepCopy(data.component);
      let idx = index.toString();
      if (data.key === idx) {
        component.name = event.currentTarget.value;
        component.input_type = input_type;
        component.required = required;
        if (values) component.values = values;
      }
      data.component = component;
      acc.push(data);
      return acc;
    }, []);
    props.onCreateSchema(localSchema);
  };


  const onComponentChange = (event, index) => {
    let idx = index.toString();
    let localSchema = deepCopy(props.postSchema);
    localSchema = localSchema.reduce((acc, data) => {
      let component = deepCopy(data.component);
      if (data.key === idx) {
        component.name = 'default';
        component.input_type = event.currentTarget.value;
        component.required = true;
        if (event.currentTarget.value === 'text') {
          component.charCount = 0;
        }
        if (event.currentTarget.value === 'dropdown') {
          component.values = [];
          component.name = component.values[0];
        }
        if (event.currentTarget.value === 'radio') {
          component.radios = [];
          component.selectedRadio = component.radios[0];
          component.radioText = '';
        }
      }
      data.component = component;
      acc.push(data);
      return acc;
    }, []);
    props.onCreateSchema(localSchema);
  };


  const onAddComponent = (event) => {
    let component = deepCopy(props.postSchema);
    let component_map = {};
    component_map.key = `${component.length}`;
    let obj = {};
    obj.name = 'default name';
    obj.input_type = 'static';
    obj.required = true;
    component_map.component = obj;
    component.push(component_map);
    props.onCreateSchema(component);
  };


  const removeComponent = (event, index) => {
    let idx = index.toString();
    let component = deepCopy(props.postSchema);
    const filtered = component.filter((obj) => obj.key !== idx);
    for (let i = 0; i < filtered.length; i++) {
      filtered[i].key = i.toString();
    }
    props.onCreateSchema(filtered);
  };


  return (
    <form onSubmit={submitForm}>
      {props.postSchema.map((data, index) => {
        return (
          <div key={index} className='box-container'>
            <div className='dropdown-container'>
              <DropDownSelect
                key={index}
                name={data && data.component ? data.component.input_type : 'component_type'}
                required={true}
                placeholder='component_type'
                handleChange={(e) => onComponentChange(e, index)}
                val={['static', 'text', 'dropdown', 'radio']}
              />
            </div>
            <div class="child-form-container">
              {data.component.input_type === 'text' && data.key === index.toString() ? (
                <InputTextField
                  key={index}
                  name={data.component.name}
                  required={data.component.required}
                  charCount={data.component.charCount}
                  setCharCount={(e) => handleCharCount(e, index)}
                  handleChange={(e) => handleChange(e, index, data.component.name, data.component.input_type, data.component.required)}
                />
              ) : null}
              {data.component.input_type === 'static' && data.key === index.toString() ? (
                <TextAreaField
                  key={index}
                  name={data.component.name}
                  required={data.component.required}
                  handleChange={(e) => handleChange(e, index, data.component.name, data.component.input_type, data.component.required)}
                  disabled={false}
                />
              ) : null}
              {data.component.input_type === 'dropdown' && data.key === index.toString() ? (
                <DropDownSelect
                  key={index}
                  name={data.component.name}
                  required={data.component.required}
                  handleChange={(e) =>
                    handleChange(e, index, data.component.name, data.component.input_type, data.component.required, data.component.values)
                  }
                  val={data.component.values}
                  optionCurrText={optionCurrText}
                  setCurrOptionText={setCurrOptionText}
                  addDropdownOptions={(e) => addDropdownOptions(e, index)}
                />
              ) : null}
              {data.component.input_type === 'radio' && data.key === index.toString() ? (
                <RadioGroup
                  key={index}
                  name={data.component.name}
                  required={data.component.required}
                  handleRadio={(e) =>
                    handleRadio(
                      e,
                      index,
                      data.component.name,
                      data.component.input_type,
                      data.component.required,
                      data.component.radios,
                      data.component.selectedRadio,
                      data.component.radioText
                    )
                  }
                  radios={data.component.radios}
                  selectedRadio={data.component.selectedRadio}
                  radioText={currRadioText}
                  addRadioOptions={(e) => addRadioOptions(e, index)}
                  setCurrRadioText={setCurrRadioText}
                  radioQuestion={data.component.radioText}
                  setRadioQuestion={(e)=>handleRadioQuestion(e,index)}
                />
              ) : null}
            </div>
            <div className="delete-btn-holder">
            <button class="delete-btn" type='button' title='Remove Component' onClick={(e) => removeComponent(e, index)}><i class="fa fa-trash"></i></button>
            </div>
          </div>
        );
      })}
      <div className='button-holder'>
        <button className='button button1' onClick={(e) => onAddComponent(e)}>
          Add Component
        </button>
        <button disabled={!props.postSchema.length} className='button button2' onClick={() => downloadObjectAsJson(props.postSchema, 'schema')}>
          Download JSON
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    postSchema: state.schemaReducer.postSchema,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateSchema: (obj) => dispatch(createSchema(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);
