import { put, call } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import { normalizeError } from '../utils/normalizeError';

export function* loginSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield call(restController.loginRequest, action.data);
    action.history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error });
  }
}

export function* registerSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield call(restController.registerRequest, action.data);
    action.history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error});
  }
}
