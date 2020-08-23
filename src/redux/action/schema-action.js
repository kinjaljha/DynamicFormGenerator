import * as actionTypes from './actionTypes';

export const createSchema = postSchema => {
  return {
    type: actionTypes.CREATE_DATA,
    postSchema
  };
};
