import { put, call } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';
import * as restController from '../api/rest/restController';
import {normalizeError} from '../utils/normalizeError';

export function* paymentSaga(action) {
  yield put({ type: ACTION.PAYMENT_ACTION_REQUEST });
  try {
    yield call(restController.payMent, action.data);
    action.history.replace('dashboard');
    yield put({ type: ACTION.CLEAR_CONTEST_STORE });
    yield put({ type: ACTION.CLEAR_PAYMENT_STORE });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.PAYMENT_ACTION_ERROR, error });
  }
}

export function* cashoutSaga(action) {
  yield put({ type: ACTION.PAYMENT_ACTION_REQUEST, data: action.data });
  try {
    const { data } = yield call(restController.cashOut, action.data);
    yield put({ type: ACTION.UPDATE_USER_DATA_SUCCESS, data });
    yield put({ type: ACTION.CLEAR_PAYMENT_STORE });
    yield put({ type: ACTION.CHANGE_PROFILE_MODE_VIEW, data: CONSTANTS.USER_INFO_MODE });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.PAYMENT_ACTION_ERROR, error });
  }
}
