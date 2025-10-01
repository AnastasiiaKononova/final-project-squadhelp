import { put, call } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import {normalizeError} from '../utils/normalizeError';

export function* activeContestsSaga(action) {
  yield put({ type: ACTION.GET_CONTESTS_ACTION_REQUEST });
  try {
    const { data } = yield call(restController.getActiveContests, action.data);
    yield put({ type: ACTION.GET_CONTESTS_ACTION_SUCCESS, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.GET_CONTESTS_ACTION_ERROR, error });
  }
}

export function* customerContestsSaga(action) {
  yield put({ type: ACTION.GET_CONTESTS_ACTION_REQUEST });
  try {
    const { data } = yield call(restController.getCustomersContests, action.data);
    yield put({ type: ACTION.GET_CONTESTS_ACTION_SUCCESS, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.GET_CONTESTS_ACTION_ERROR, error });
  }
}

export function* updateContestSaga(action) {
  yield put({ type: ACTION.UPDATE_CONTEST_REQUEST });
  try {
    const { id, formData } = action.data;
    const { data } = yield call(restController.updateContest, id, formData);
    yield put({ type: ACTION.UPDATE_STORE_AFTER_UPDATE_CONTEST, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.UPDATE_CONTEST_ERROR, error });
  }
}

export function* dataForContestSaga(action) {
  yield put({ type: ACTION.GET_DATA_FOR_CONTEST_ACTION_REQUEST });
  try {
    const { data } = yield call(restController.dataForContest, action.data);
    yield put({ type: ACTION.GET_DATA_FOR_CONTEST_ACTION_SUCCESS, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.GET_DATA_FOR_CONTEST_ACTION_ERROR, error });
  }
}

export function* getContestByIdSaga(action) {
  yield put({ type: ACTION.GET_CONTEST_BY_ID_REQUEST });
  try {
    const { data } = yield call(restController.getContestById, action.data.contestId);
    const { Offers, ...contestData} = data;
    yield put({ 
      type: ACTION.GET_CONTEST_BY_ID_SUCCESS, 
      data: { contestData, offers: Offers } });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.GET_CONTEST_BY_ID_ERROR, error});
  }
}

export function* downloadContestFileSaga(action) {
  yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_REQUEST });
  try {
    const { data } = yield call(restController.downloadContestFile, action.data);
    yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_SUCCESS, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_ERROR, error });
  }
}
