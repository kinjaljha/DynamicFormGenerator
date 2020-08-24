import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../utility';

const initState = {
  postSchema: []
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
