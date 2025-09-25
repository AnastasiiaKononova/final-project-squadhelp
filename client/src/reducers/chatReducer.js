import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: true,
  chatData: null,
  messages: [],
  error: null,
  isExpanded: false,
  interlocutor: [],
  messagesPreview: [],
  isShow: false,
  isShowCatalogCreation: false,
  chatMode: CONSTANTS.NORMAL_PREVIEW_CHAT_MODE,
};
  
export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_PREVIEW_CHAT: {
      return {
        ...state,
        messagesPreview: action.data,
        error: null,
      };
    }
    case ACTION.GET_PREVIEW_CHAT_ERROR: {
      return {
        ...state,
        error: action.error,
        messagesPreview: [],
      };
    }
    case ACTION.SET_CHAT_BLOCK_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ACTION.SET_CHAT_FAVORITE_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ACTION.BACK_TO_DIALOG_LIST: {
      return {
        ...state,
        isExpanded: false,
      };
    }
    case ACTION.GO_TO_EXPANDED_DIALOG: {
      return {
        ...state,
        interlocutor: { ...state.interlocutor, ...action.data.interlocutor },
        chatData: action.data.conversationData,
        isShow: true,
        isExpanded: true,
        messages: [],
      };
    }
    case ACTION.GET_DIALOG_MESSAGES: {
      return {
        ...state,
        messages: action.data.messages,
        interlocutor: action.data.interlocutor,
      };
    }
    case ACTION.GET_DIALOG_MESSAGES_ERROR: {
      return {
        ...state,
        messages: [],
        interlocutor: null,
        error: action.error,
      };
    }
    case ACTION.SEND_MESSAGE: {
      return {
        ...state,
        chatData: { ...state.chatData, ...action.data.chatData },
        messagesPreview: action.data.messagesPreview,
        messages: [...state.messages, action.data.message],
      };
    }
    case ACTION.SEND_MESSAGE_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ACTION.CLEAR_MESSAGE_LIST: {
      return {
        ...state,
        messages: [],
      };
    }
    case ACTION.CHANGE_CHAT_SHOW: {
      return {
        ...state,
        isShowCatalogCreation: false,
        isShow: !state.isShow,
      };
    }
    case ACTION.SET_CHAT_PREVIEW_MODE: {
      return {
        ...state,
        chatMode: action.mode,
      };
    }
    case ACTION.CHANGE_CHAT_FAVORITE: {
      return {
        ...state,
        chatData: action.data.changedPreview,
        messagesPreview: action.data.messagesPreview,
      };
    }
    case ACTION.CHANGE_CHAT_BLOCK: {
      return {
        ...state,
        chatData: action.data.chatData,
        messagesPreview: action.data.messagesPreview,
      };
    }
    case ACTION.CLEAR_CHAT_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
}
