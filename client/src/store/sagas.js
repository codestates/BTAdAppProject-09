import { all, fork } from "redux-saga/effects";
import MainSaga from "./main/saga";

export default function* rootSaga() {
  yield all([fork(MainSaga)]);
}
