import {createAction} from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export const updateSchema = createAction(ActionTypes.SCHEMA.UPDATE);
