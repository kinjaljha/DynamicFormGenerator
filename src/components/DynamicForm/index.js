import React, { useState } from 'react';
import { createSchema } from '../../redux/action/schema-action';
import './index.css';
import { connect } from 'react-redux';

import InputTextField from '../../form-components/InputTextField';
import TextAreaField from '../../form-components/TextAreaField';
import DropDownSelect from '../../form-components/DropDownSelect';

const DynamicForm = (props) => {
	const [element, setElement] = useState('');
	// const[state, setState] = useState(props.postSchema);
	const submitForm = (event) => {
		const { postSchema, ...inputFields } = props;

		console.log(inputFields);

		event.preventDefault();
	};
	const handleChange = (event, placeholder, name, input_type, required, values) => {
		let obj = {};
		console.log('placeholder, name, input_type, required, values', placeholder, name, input_type, required, values);

		let localSchema = JSON.parse(JSON.stringify(props.postSchema));

		localSchema = localSchema.reduce((acc, data) => {
			if (data.name === event.currentTarget.name) {
				let obj = JSON.parse(JSON.stringify(data));
				console.log('OBJ BEFORE----->', obj);
				// { placeholder: 'Enter Name', name: 'remaining values', input_type: "static", required: true},
				obj['placeholder'] = placeholder;
				obj[name] = name;
				obj[input_type] = input_type;
				obj[required] = required;
				console.log('OBJ AFTER----->', obj);

				obj[event.currentTarget.name] = event.currentTarget.value;
				if (values) obj.values = values;

				data = { ...data, ...obj };
			}
			acc.push(data);
			return acc;
		}, []);
		props.onCreateSchema(localSchema);
	};

	const onComponentChange = (event, index) => {
		let obj = {};
		if (typeof event === 'string') {
			setElement(event);
			return;
		} else setElement(event.currentTarget.value);
		let idx = index.toString();
		let localSchema = props.postSchema;
		localSchema = localSchema.reduce((acc, data) => {
			let comp_obj = {};
			if (data.key === idx) {
				comp_obj = JSON.parse(JSON.stringify(data.component));
				comp_obj.placeholder = 'default';
				comp_obj.name = 'default';
				comp_obj.input_type = event.currentTarget.value;
				comp_obj.required = 'required';
				if (event.currentTarget.value === 'dropdown') {
					comp_obj.values = ['dum1', 'dum2'];
				}
				comp_obj[event.currentTarget.name] = event.currentTarget.value;
			}
			data.component = comp_obj;
			acc.push(data);
			return acc;
		}, []);

		obj[event.currentTarget.name] = event.currentTarget.value;
		obj.placeholder = 'default';
		obj.name = 'default';
		obj.input_type = event.currentTarget.value;
		obj.required = 'required';
		if (element === 'dropdown') {
			obj.values = ['dum1', 'dum2'];
		}
		props.onCreateSchema(localSchema);
	};

	const onAddComponent = (event) => {
		let local_component_array = JSON.parse(JSON.stringify(props.postSchema));

		let component_obj_map = {};
		component_obj_map.key = `${local_component_array.length}`;
		component_obj_map.option_selected = 'static';

		let obj = {};
		obj.placeholder = 'default';
		obj.name = 'default';
		obj.input_type = 'static';
		obj.required = 'required';
		component_obj_map.component = obj;

		local_component_array.push(component_obj_map);
		props.onCreateSchema(local_component_array);
	};

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
								key='component_type'
								name='component type'
								required={true}
								placeholder='component type'
								handleChange={(e) => onComponentChange(e, index)}
								val={['static', 'text', 'dropdown', 'radio']}
							/>
						</div>
						<div>
							{data.component.input_type === 'text' ? (
								<InputTextField
									//   key={data.placeholder}
									key={index}
									name={data.component.name}
									required={data.component.required}
									placeholder={data.component.placeholder}
									handleChange={(e) => handleChange(e, data.component.placeholder, data.component.name, data.component.input_type, data.component.required)}
								/>
							) : null}
							{data.component.input_type === 'static' ? (
								<TextAreaField
									key={index}
									name={data.component.name}
									required={data.component.required}
									placeholder={data.component.placeholder}
									handleChange={(e) => handleChange(e, data.component.placeholder, data.component.name, data.component.input_type, data.component.required)}
									disabled={false}
								/>
							) : null}
							{data.component.input_type === 'dropdown' ? (
								<DropDownSelect
									key={index}
									name={data.component.name}
									required={data.component.required}
									placeholder={data.component.placeholder}
									handleChange={(e) => handleChange(e, data.component.placeholder, data.component.name, data.component.input_type, data.component.required, data.component.values)}
									val={data.component.values}
								/>
							) : null}
						</div>
					</div>
				);
			})}
			<button onClick={(e) => onAddComponent(e)}>Add Component</button>
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
