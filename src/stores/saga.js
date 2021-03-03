import { all } from "redux-saga/effects";
import { authSagas } from "../features/authentication/sagas";
import { SOSSagas } from "../features/SOS/sagas";
import { homeSagas } from "../features/home/sagas";
import { notifySagas } from "../features/notify/sagas";
import { couponSagas } from "../features/coupon/sagas";
import { historyPointSagas } from "../features/historyPoint/sagas";
import { createSOSSagas } from "../features/createSOS/sagas";
import { volunteerSagas } from "../features/volunteer/sagas";

export default function* rootSaga() {
  yield all([...authSagas]);
  yield all([...SOSSagas]);
  yield all([...homeSagas]);
  yield all([...notifySagas]);
  yield all([...couponSagas]);
  yield all([...historyPointSagas]);
  yield all([...createSOSSagas]);
  yield all([...volunteerSagas]);
}
