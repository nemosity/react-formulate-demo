import { put, select, takeLatest } from "redux-saga/effects";
import _get from "lodash/get";

import ActionTypes from "../constants/actionTypes";
import { getFormInput, getParsedSchema } from "../utils/stateSelectors";
import { joinPath, validate } from "@nemosity/react-formulate";

function* doValidateForm(action) {
  const input = yield select(getFormInput);
  const schema = yield select(getParsedSchema);

  if (Number.isInteger(action.payload) && schema[action.payload].pageId) {
    const page = schema[action.payload].content;
    const { errors, cleanInput } = validate(page, input);

    if (errors) {
      yield put({ type: ActionTypes.FORM.VALIDATE_FAIL, payload: errors });
    } else {
      yield put({ type: ActionTypes.FORM.CLEAN, payload: cleanInput });
      yield put({ type: ActionTypes.FORM.MOVE_NEXT, payload: action.payload });
    }
  }
}

export function* validateForm() {
  yield takeLatest(ActionTypes.FORM.VALIDATE, doValidateForm);
}

function* doValidateElement(action) {
  const input = yield select(getFormInput);
  const { schema, path } = action.payload;

  if (schema.id) {
    const { errors } = validate(schema, input, path);

    if (errors) {
      yield put({
        type: ActionTypes.FORM.VALIDATE_ELEMENT_FAIL,
        payload: errors,
      });
    } else {
      yield put({
        type: ActionTypes.FORM.VALIDATE_ELEMENT_SUCCESS,
        payload: joinPath(schema.id, path),
      });
    }
  }
}

export function* validateElement() {
  yield takeLatest(ActionTypes.FORM.VALIDATE_ELEMENT, doValidateElement);
}

function* doMoveNext(action) {
  const input = yield select(getFormInput);
  const schema = yield select(getParsedSchema);
  let nextStep = action.payload + 1;

  const shouldSkipStep = (step) => {
    const showIf = schema[step].showIf;
    if (showIf) {
      if (!(_get(input, showIf.id) === showIf.value)) {
        return true;
      }
    }
    return false;
  };

  while (shouldSkipStep(nextStep)) {
    nextStep++;
  }

  yield put({ type: ActionTypes.FORM.UPDATE.STEP, payload: nextStep });
}

export function* moveNext() {
  yield takeLatest(ActionTypes.FORM.MOVE_NEXT, doMoveNext);
}
