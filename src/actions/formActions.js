import {createAction} from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export const clearForm = createAction(ActionTypes.FORM.CLEAR);
export const updateForm = createAction(ActionTypes.FORM.UPDATE.INPUT);
export const updateStep = createAction(ActionTypes.FORM.UPDATE.STEP);
export const moveBack = createAction(ActionTypes.FORM.MOVE_BACK)
export const submit = createAction(ActionTypes.FORM.SUBMIT);
export const validateForm = createAction(ActionTypes.FORM.VALIDATE);
export const validateElement = createAction(ActionTypes.FORM.VALIDATE_ELEMENT);
