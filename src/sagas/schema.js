import { put, takeLatest } from 'redux-saga/effects';

import ActionTypes from '../constants/actionTypes';

function* doLoadSchema(action) {
  let parsedSchema;
  let valid;
  try {
    parsedSchema = JSON.parse(action.payload);
    valid = true;
  }
  catch (e) {
    valid = false;
  }
  if (valid) {
    yield put({ type: ActionTypes.SCHEMA.LOAD, payload: parsedSchema });
  } else {
    yield put({ type: ActionTypes.SCHEMA.ERROR });
  }
}

export function* loadSchema() {
  yield takeLatest(ActionTypes.SCHEMA.UPDATE, doLoadSchema);
}
