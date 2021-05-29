import { all, fork } from "redux-saga/effects";

import { validateForm, validateElement, moveNext } from "./form";
import { loadSchema } from "./schema";

export default function* rootSaga() {
  yield all([
    fork(validateForm),
    fork(validateElement),
    fork(loadSchema),
    fork(moveNext),
  ]);
}
