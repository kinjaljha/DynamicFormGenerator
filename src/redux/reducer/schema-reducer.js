import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../utility';

const initState = {
  postSchema: [
    // { placeholder: 'Enter Name', name: 'remaining values', input_type: "static", required: true},
    // { placeholder: 'Enter Email', name: 'email', input_type: "text", required: true},
    // { placeholder: 'Dropdown', name: 'name', input_type: "dropdown", required: true, values: ["one", "two", ]}
  ]
};

export const onCreateData = (state, action) => {
  return updateObject(state, {
    postSchema: action.postSchema
  });
};

export const schemaReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_DATA:
      return onCreateData(state, action);

    default:
      return state;
  }
};
