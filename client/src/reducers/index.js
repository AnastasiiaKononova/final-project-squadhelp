import { combineReducers } from 'redux';
import authReducer from './authReducer';
import getUserReducer from './userReducer';
import payReducer from './payReducer';
import bundleReducer from './bundleReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';
import catalogReducer from './catalogReducer';
import {
  dataForContestReducer,
  getContestByIdReducer,
  getContestsReducer,
  storeContestReducer,
  updateContestReducer,
} from './contestReducers';

const appReducer = combineReducers({
  userStore: getUserReducer,
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: payReducer,
  contestByIdStore: getContestByIdReducer,
  contestsList: getContestsReducer,
  contestStore: storeContestReducer,
  bundleStore: bundleReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
  catalogStore: catalogReducer,
});

export default appReducer;
