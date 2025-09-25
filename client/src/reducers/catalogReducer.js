import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  catalogList: [],
  currentCatalog: null,
  addChatId: null,
  isShowCatalogCreation: false,
  isRenameCatalog: false,
  isShowChatsInCatalog: false,
  catalogCreationMode: CONSTANTS.ADD_CHAT_TO_OLD_CATALOG,
  error: null,
  isFetching: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.RECEIVE_CATALOG_LIST: {
      return {
        ...state,
        isFetching: false,
        catalogList: [...action.data],
      };
    }

    case ACTION.RECEIVE_CATALOG_LIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    case ACTION.ADD_CHAT_TO_CATALOG: {
      return {
        ...state,
        isShowCatalogCreation: false,
        catalogList: [...action.data],
      };
    }

    case ACTION.ADD_CHAT_TO_CATALOG_ERROR: {
      return {
        ...state,
        error: action.error,
        isShowCatalogCreation: false,
      };
    }

    case ACTION.CREATE_CATALOG_SUCCESS: {
      return {
        ...state,
        catalogList: [...state.catalogList, action.data],
        isShowCatalogCreation: false,
      };
    }

    case ACTION.CREATE_CATALOG_ERROR: {
      return {
        ...state,
        isShowCatalogCreation: false,
        error: action.error,
      };
    }

    case ACTION.DELETE_CATALOG_SUCCESS: {
      return {
        ...state,
        catalogList: [...action.data],
      };
    }

    case ACTION.DELETE_CATALOG_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    case ACTION.REMOVE_CHAT_FROM_CATALOG_SUCCESS: {
      return {
        ...state,
        currentCatalog: action.data.currentCatalog,
        catalogList: [...action.data.catalogList],
      };
    }

    case ACTION.REMOVE_CHAT_FROM_CATALOG_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    case ACTION.CHANGE_CATALOG_NAME_SUCCESS: {
      return {
        ...state,
        catalogList: [...action.data.catalogList],
        currentCatalog: action.data.currentCatalog,
        isRenameCatalog: false,
      };
    }

    case ACTION.CHANGE_CATALOG_NAME_ERROR: {
      return {
        ...state,
        isRenameCatalog: false,
      };
    }

    case ACTION.CHANGE_SHOW_MODE_CATALOG: {
      return {
        ...state,
        currentCatalog: { ...state.currentCatalog, ...action.data },
        isShowChatsInCatalog: !state.isShowChatsInCatalog,
        isRenameCatalog: false,
      };
    }

    case ACTION.CHANGE_TYPE_ADDING_CHAT_IN_CATALOG: {
      return {
        ...state,
        catalogCreationMode: action.data,
      };
    }

    case ACTION.CHANGE_SHOW_ADD_CHAT_TO_CATALOG: {
      return {
        ...state,
        addChatId: action.data,
        isShowCatalogCreation: !state.isShowCatalogCreation,
      };
    }

    case ACTION.CHANGE_RENAME_CATALOG_MODE: {
      return {
        ...state,
        isRenameCatalog: !state.isRenameCatalog,
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
