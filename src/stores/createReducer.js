import { combineReducers } from "redux";
import authentication from "../features/authentication/redux/reducers";
import SOSReducer from "../features/SOS/redux/reducers";
import homeReducer from "../features/home/redux/reducers";
import notifyReducer from "../features/notify/redux/reducers";
import couponReducer from "../features/coupon/redux/reducers";
import historyPointReducer from "../features/historyPoint/redux/reducers";
import createSOSReducer from "../features/createSOS/redux/reducers";
import volunteerReducer from "../features/volunteer/redux/reducers";

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    userReducer: authentication,
    SOSReducer: SOSReducer,
    homeReducer: homeReducer,
    notifyReducer: notifyReducer,
    couponReducer: couponReducer,
    historyPointReducer: historyPointReducer,
    createSOSReducer: createSOSReducer,
    volunteerReducer: volunteerReducer,
  });

  return rootReducer;
}
