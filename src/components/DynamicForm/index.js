import React, { useState } from 'react';
import { createSchema } from '../../redux/action/schema-action';
import './index.css';
import { connect } from 'react-redux';

import InputTextField from '../../form-components/InputTextField';
import TextAreaField from '../../form-components/TextAreaField';
import DropDownSelect from '../../form-components/DropDownSelect';
import RadioGroup from '../../form-components/RadioButton';

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }


const DynamicForm = (props) => {
	const [element, setElement] = useState('');
	// const[state, setState] = useState(props.postSchema);
	const submitForm = (event) => {
		const { postSchema, ...inputFields } = props;

		console.log(inputFields);

		event.preventDefault();
    };
    
    React.useEffect(()=>{
        console.log("In useEffect-->", JSON.stringify(props.postSchema));
    }, [props.postSchema])

    const addRadios = (event, index) => {
        console.log("In add radios");
        let localSchema = JSON.parse(JSON.stringify(props.postSchema));
        let idx = index.toString();
        localSchema = localSchema.reduce((acc, data) => {
			let comp_obj = {};
			if (data.key === idx) {
                console.log("Pushing radio", index);
                comp_obj = JSON.parse(JSON.stringify(data.component));
                let len = comp_obj.radios.length;
                comp_obj.radios.push(`radio${index+len}`);
                console.log("comp_obj.radios", comp_obj.radios);
            }
            else{
                comp_obj = JSON.parse(JSON.stringify(data.component));
            }
			data.component = comp_obj;
			acc.push(data);
			return acc;
		}, []);
        props.onCreateSchema(localSchema);
    }

    const handleClick = (event, index, name, input_type, required, radios, selectedRadio) => {
		let localSchema = JSON.parse(JSON.stringify(props.postSchema));
        console.log("on handle radio", event.currentTarget.value);
		localSchema = localSchema.reduce((acc, data) => {
            let obj;
            if (data.key === index.toString()) {
				obj = JSON.parse(JSON.stringify(data.component));
				obj.selectedRadio = obj.radios[event.currentTarget.value];
				obj.input_type = input_type;
				obj.required = required;
                if (radios) obj.radios = radios;
            }
            else{
                obj = JSON.parse(JSON.stringify(data.components));
            }
            data.component = obj;
			acc.push(data);
			return acc;
		}, []);
		props.onCreateSchema(localSchema);

    };
  

	const handleChange = (event, index, name, input_type, required, values) => {

        console.log("In handle change");

		let localSchema = JSON.parse(JSON.stringify(props.postSchema));

		localSchema = localSchema.reduce((acc, data) => {
            let obj;
            if (data.key === index.toString()) {
				obj = JSON.parse(JSON.stringify(data.component));
				console.log('OBJ BEFORE----->', obj);
				// { placeholder: 'Enter Name', name: 'remaining values', input_type: "static", required: true},
				
				obj.name = event.currentTarget.value;
				obj.input_type = input_type;
				obj.required = required;
				console.log('OBJ AFTER----->', obj);

				// obj[event.currentTarget.name] = event.currentTarget.value;
				if (values) obj.values = values;

				// data = { ...data, ...obj };
            }
            else{
                obj = JSON.parse(JSON.stringify(data.component));
            }
            data.component = obj;
			acc.push(data);
			return acc;
		}, []);
		props.onCreateSchema(localSchema);
	};

	const onComponentChange = (event, index) => {
        console.log("event.currentTarget.value--------->", event.currentTarget.value);

        setElement(event.currentTarget.value);
		let idx = index.toString();
		let localSchema = JSON.parse(JSON.stringify(props.postSchema));
		localSchema = localSchema.reduce((acc, data) => {
			let comp_obj = {};
			if (data.key === idx) {
				comp_obj = JSON.parse(JSON.stringify(data.component));
				
				comp_obj.name = 'deafult name';
				comp_obj.input_type = event.currentTarget.value;
				comp_obj.required = 'required';
				if (event.currentTarget.value === 'dropdown') {
					comp_obj.values = ['dum1', 'dum2'];
                }
                if(event.currentTarget.value === 'radio'){
                    comp_obj.radios = ["radio1", "radio2"];
                    comp_obj.selectedRadio = comp_obj.radios[0];
                }
				comp_obj[event.currentTarget.name] = event.currentTarget.value;
            }
            else{
                comp_obj = JSON.parse(JSON.stringify(data.component));
            }
			data.component = comp_obj;
			acc.push(data);
			return acc;
		}, []);

		props.onCreateSchema(localSchema);
	};

	const onAddComponent = (event) => {
		let local_component_array = JSON.parse(JSON.stringify(props.postSchema));

		let component_obj_map = {};
		component_obj_map.key = `${local_component_array.length}`;
		// component_obj_map.option_selected = 'static';

		let obj = {};
		obj.name = 'default name';
		obj.input_type = 'static';
		obj.required = true;
		component_obj_map.component = obj;

		local_component_array.push(component_obj_map);
		props.onCreateSchema(local_component_array);
	};


    const removeComponent = (event, index) => {
        console.log("index-------->", index);
        let idx = index.toString();
        let local_component_array = JSON.parse(JSON.stringify(props.postSchema));
        console.log("BEFPRE filter--------->", local_component_array);
        const filtered = local_component_array.filter((obj)=>(obj.key !== idx));
        // console.log("AFTER filter--------->", filtered);
        for(let i=0; i< filtered.length; i++){
            filtered[i].key = i.toString();
        }
        console.log("AFTER filter--------->", filtered);
        props.onCreateSchema(filtered);
    }


	React.useEffect(() => {
		console.log('props.postSchema', props.postSchema);
	}, [props.postSchema]);

	return (
		<form onSubmit={submitForm}>
			{props.postSchema.map((data, index) => {
				return (
					<div key={index} className='box-component'>
						<div className='dropdown-component'>
							<DropDownSelect
								key={index}
								name={data && data.component ? (data.component.input_type) : 'component_type'}
								required={true}
								placeholder='component_type'
								handleChange={(e) => onComponentChange(e, index)}
								val={['static', 'text', 'dropdown', 'radio']}
							/>
						</div>
						<div>
							{data.component.input_type === 'text' && data.key === index.toString()? (
								<InputTextField
									//   key={data.placeholder}
									key={index}
									name={data.component.name}
									required={data.component.required}
									placeholder={data.component.placeholder}
									handleChange={(e) => handleChange(e, index, data.component.name, data.component.input_type, data.component.required)}
								/>
							) : null}
							{data.component.input_type === 'static' && data.key === index.toString()? (
								<TextAreaField
									key={index}
									name={data.component.name}
									required={data.component.required}
									placeholder={data.component.placeholder}
									handleChange={(e) => handleChange(e, index, data.component.name, data.component.input_type, data.component.required)}
									disabled={false}
								/>
							) : null}
							{data.component.input_type === 'dropdown' && data.key === index.toString()? (
								<DropDownSelect
									key={index}
									name={data.component.name}
									required={data.component.required}
									placeholder={data.component.placeholder}
									handleChange={(e) => handleChange(e, index, data.component.name, data.component.input_type, data.component.required, data.component.values)}
									val={data.component.values}
								/>
							) : null}
                            {data.component.input_type === 'radio' && data.key === index.toString()? (
                                // name, required, placeholder, handleRadio, radios, selectedRadio
								<RadioGroup
									key={index}
									name={data.component.name}
									required={data.component.required}
									placeholder={data.component.placeholder}
									handleRadio={(e) => handleClick(e, index, data.component.name, data.component.input_type, data.component.required, data.component.radios, data.component.selectedRadio)}
                                    radios={data.component.radios}
                                    selectedRadio={data.component.selectedRadio}
                                    addRadios={(e)=>addRadios(e, index)}
								/>
							) : null}
						</div>
                        <button type='button' title='Remove Component' onClick={(e) => removeComponent(e,index)}>
              remove
            </button>
            </div>
				);
			})}
			<button onClick={(e) => onAddComponent(e)}>Add Component</button>
			<button onClick={() => downloadObjectAsJson(props.postSchema, "schema")}>Download JSON</button>
            
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		postSchema: state.schemaReducer.postSchema
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCreateSchema: (obj) => dispatch(createSchema(obj))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);
