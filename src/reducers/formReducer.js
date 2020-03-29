import {
  set as _setFp,
  unset as _unsetFp,
  merge as _mergeFp
} from 'lodash/fp';

import ActionTypes from '../constants/actionTypes';

const initialState = {
  errors: null,
  input: {},
  step: 0,
  visitedSteps: []
};

export default function formReducer (state = initialState, {type, payload}) {

  switch (type) {

    case ActionTypes.FORM.CLEAR:
    case ActionTypes.SCHEMA.LOAD: {
      return initialState;
    }

    case ActionTypes.FORM.UPDATE.INPUT: {
      return _setFp(`input.${payload.path}`, payload.data, state);
    }

    case ActionTypes.FORM.CLEAN: {
      return _setFp(`input`, payload, state);
    }

    case ActionTypes.FORM.SUBMIT: {
      return _setFp(`input`, payload, state);
    }

    case ActionTypes.FORM.UPDATE.STEP: {
      return {
        ...state,
        step: payload,
        visitedSteps: [...state.visitedSteps, state.step],
        errors: null
      }
    }

    case ActionTypes.FORM.MOVE_BACK: {
      return {
        ...state,
        step: state.visitedSteps[state.visitedSteps.length - 1],
        visitedSteps: state.visitedSteps.slice(0, state.visitedSteps.length - 1)
      }
    }

    case ActionTypes.FORM.VALIDATE_FAIL: {
      return {
        ...state,
        errors: payload
      }
    }

    case ActionTypes.FORM.VALIDATE_ELEMENT_FAIL: {
      return {
        ...state,
        errors: _mergeFp(state.errors, payload)
      }
    }

    case ActionTypes.FORM.VALIDATE_ELEMENT_SUCCESS: {
      return _unsetFp(`errors.${payload}`, state);
    }

    default:
      return state;
  }

}
