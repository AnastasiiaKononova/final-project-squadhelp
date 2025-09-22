import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';
import {normalizeError} from '../utils/normalizeError';

const initialState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: CONSTANTS.CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 0,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_CONTESTS_ACTION_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_CONTESTS_ACTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        contests: [...state.contests, ...action.data.contests],
        haveMore: action.data.haveMore,
      };
    }
    case ACTION.GET_CONTESTS_ACTION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: normalizeError(action.error),
        contests: [],
      };
    }
    case ACTION.CLEAR_CONTESTS_LIST: {
      return {
        ...state,
        error: null,
        contests: [],
      };
    }
    case ACTION.SET_NEW_CUSTOMER_FILTER: {
      return {
        ...state,
        customerFilter: action.filter,
        contests: [],
        error: null,
        haveMore: true
      };
    }
    case ACTION.SET_NEW_CREATOR_FILTER: {
      return {
        ...initialState,
        isFetching: false,
        creatorFilter: { ...state.creatorFilter, ...action.filter },
      };
    }
    default:
      return state;
  }
}
