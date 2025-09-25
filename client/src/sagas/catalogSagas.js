import { put, call, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import { normalizeError } from '../utils/normalizeError';

export function* getCatalogListSaga(action) {
  try {
    const { data } = yield call(restController.getCatalogList, action.data);
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST_ERROR, error});
  }
}

export function* addChatToCatalog(action) {
  try {
    const { data } = yield call(restController.addChatToCatalog, action.data);
    const { catalogList } = yield select((state) => state.catalogStore);
   
    const newCatalogList = catalogList.map(catalog => 
      catalog._id === data._id ? {...catalog, chats: data.chats} : catalog
    );
    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG, data: newCatalogList });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG_ERROR, error });
  }
}

export function* createCatalog(action) {
  try {
    const { data } = yield call(restController.createCatalog, action.data);
    yield put({ type: ACTION.CREATE_CATALOG_SUCCESS, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.CREATE_CATALOG_ERROR, error });
  }
}

export function* deleteCatalog(action) {
  try {
    yield call(restController.deleteCatalog, action.data.catalogId);
    const { catalogList } = yield select((state) => state.catalogStore);
    const newCatalogList = catalogList.filter(catalog => catalog._id !== action.data.catalogId);
    yield put({ type: ACTION.DELETE_CATALOG_SUCCESS, data: newCatalogList });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.DELETE_CATALOG_ERROR, error});
  }
}

export function* removeChatFromCatalogSaga(action) {
  try {
    const { data } = yield call(restController.removeChatFromCatalog, action.data);
    const { catalogList } = yield select((state) => state.catalogStore);

    const newCatalogList = catalogList.map(catalog => 
      catalog._id === data._id ? {...catalog, chats: data.chats} : catalog
    );

    yield put({ type: ACTION.REMOVE_CHAT_FROM_CATALOG_SUCCESS, data: { catalogList: newCatalogList, currentCatalog: data } });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.REMOVE_CHAT_FROM_CATALOG_ERROR, error });
  }
}

export function* changeCatalogName(action) {
  try {
    const { data } = yield call(restController.changeCatalogName, action.data);
    const { catalogList } = yield select((state) => state.catalogStore);
    const newCatalogList = catalogList.map(catalog => 
      catalog._id === data._id ? {...catalog, catalogName: data.catalogName} : catalog
    );
    yield put({ type: ACTION.CHANGE_CATALOG_NAME_SUCCESS, data: { catalogList: newCatalogList, currentCatalog: data } });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.CHANGE_CATALOG_NAME_ERROR, error });
  }
}
