import ActionTypes from "../constants/actionTypes";

const initialState = {
  rawSchema: "",
  parsedSchema: null,
  valid: null,
};

export default function schemaReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.SCHEMA.UPDATE: {
      return {
        ...state,
        rawSchema: payload,
      };
    }

    case ActionTypes.SCHEMA.LOAD: {
      return {
        ...state,
        parsedSchema: payload,
        valid: true,
      };
    }

    case ActionTypes.SCHEMA.ERROR: {
      return {
        ...state,
        valid: false,
      };
    }

    default:
      return state;
  }
}
