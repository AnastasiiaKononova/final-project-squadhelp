import { put, select, call} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from '../constants';
import {normalizeError} from '../utils/normalizeError';


export function* changeMarkSaga(action) {
  try {
    const { data } = yield call(restController.changeMark, action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);

    const newOffers = offers.map((offer) => {
      if (offer.User.id === data.userId) {
        return {
          ...offer,
          User: {...offer.User, rating: data.rating},
          mark: offer.id === action.data.offerId ? action.data.mark : offer.mark,
        };
      }
      if (offer.id === action.data.offerId) {
        return {
          ...offer,
          mark: action.data.mark,
        };
      }
      return offer;
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: newOffers });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield call(restController.setNewOffer, action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    const newOffers = [data, ...offers];
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: newOffers });
    if (action.resetForm) action.resetForm();
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.ADD_OFFER_ERROR, error });
  }
}

export function* setOfferStatusSaga(action) {
  try {
    const { data } = yield call(restController.setOfferStatus, action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);

    const newOffers = offers.map((offer) => {
      if (data.status === CONSTANTS.OFFER_STATUS_WON) {
        return {
          ...offer,
          status: data.id === offer.id ? CONSTANTS.OFFER_STATUS_WON : CONSTANTS.OFFER_STATUS_REJECTED
        };
      }
      if (data.id === offer.id) {
        return {
          ...offer,
          status: CONSTANTS.OFFER_STATUS_REJECTED,
        };
      }
      return offer;
    });
    yield put({ type: ACTION.CHANGE_STORE_FOR_STATUS, data: newOffers});
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error });
  }
}
