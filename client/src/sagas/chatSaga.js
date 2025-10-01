import { put, call, select } from 'redux-saga/effects';
import isEqual from 'lodash/isEqual';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import { normalizeError } from '../utils/normalizeError';

export function* previewSaga() {
  try {
    const { data } = yield call(restController.getPreviewChat);
    yield put({ type: ACTION.GET_PREVIEW_CHAT, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.GET_PREVIEW_CHAT_ERROR, error });
  }
}

export function* getDialog(action) {
  try {
    const interlocutorId = action.data.interlocutorId;
    const { data } = yield call(restController.getDialog, interlocutorId);
    yield put({ type: ACTION.GET_DIALOG_MESSAGES, data });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.GET_DIALOG_MESSAGES_ERROR, error });
  }
}

export function* sendMessage(action) {
  try {
    const { data } = yield call(restController.newMessage, action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);

    let found = false;
    const newMessagePreview = messagesPreview.map(preview => {
      if (isEqual(preview.participants, data.message.participants)) {
        found = true;
        return {
          ...preview,
          text: data.message.body,
          sender: data.message.sender,
          createAt: data.message.createdAt,
        };
      }
      return preview;
    });

    const finalMessagePreview = found ? newMessagePreview : [...newMessagePreview, data.preview];
    yield put({
      type: ACTION.SEND_MESSAGE,
      data: {
        message: data.message,
        messagesPreview: finalMessagePreview,
        chatData: {
          _id: data.preview._id,
          participants: data.preview.participants,
          favoriteList: data.preview.favoriteList,
          blackList: data.preview.blackList,
        },
      },
    });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.SEND_MESSAGE_ERROR, error });
  }
}

export function* changeChatFavorite(action) {
  try {
    const { data } = yield call(restController.changeChatFavorite, action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);
 
    const newMessagePreview = messagesPreview.map(preview => 
      isEqual(preview.participants, data.participants)
      ? {...preview, favoriteList: data.favoriteList}
      : preview
    );

    yield put({ type: ACTION.CHANGE_CHAT_FAVORITE, data: { changedPreview: data, messagesPreview: newMessagePreview} });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.SET_CHAT_FAVORITE_ERROR, error });
  }
}

export function* changeChatBlock(action) {
  try {
    const { data } = yield call(restController.changeChatBlock, action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);

    const newMessagePreview = messagesPreview.map(preview => 
      isEqual(preview.participants, data.participants)
      ? {...preview, blackList: data.blackList}
      : preview
    );

    yield put({ type: ACTION.CHANGE_CHAT_BLOCK, data: { messagesPreview: newMessagePreview, chatData: data } });
  } catch (err) {
    const error = normalizeError(err);
    yield put({ type: ACTION.SET_CHAT_BLOCK_ERROR, error });
  }
}

