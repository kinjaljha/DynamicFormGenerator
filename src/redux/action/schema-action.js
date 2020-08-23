import * as actionTypes from './actionTypes';

export const createSchema = postSchema => {
  console.log("POSTSCHEMA in action", postSchema);
  return {
    type: actionTypes.CREATE_DATA,
    postSchema
  };
};
