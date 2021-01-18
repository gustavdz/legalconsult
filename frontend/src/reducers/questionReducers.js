import {
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_CREATE_RESET,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_UPDATE_RESET,
  QUESTION_CREATE_MESSAGE_REQUEST,
  QUESTION_CREATE_MESSAGE_SUCCESS,
  QUESTION_CREATE_MESSAGE_FAIL,
  QUESTION_CREATE_MESSAGE_RESET,
  QUESTION_ALL_REQUEST,
  QUESTION_ALL_SUCCESS,
  QUESTION_ALL_FAIL,
  QUESTION_DETAILS_RESET,
} from "../constants/questionConstants";

export const questionListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return { loading: true, questions: [] };
    case QUESTION_LIST_SUCCESS:
      return {
        loading: false,
        questions: action.payload.questions,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case QUESTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionDetailsReducer = (
  state = {
    question: {
      messages: [],
      areas: [],
      user: {},
    },
  },
  action
) => {
  switch (action.type) {
    case QUESTION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case QUESTION_DETAILS_SUCCESS:
      return {
        loading: false,
        question: action.payload,
      };
    case QUESTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_DETAILS_RESET:
      return { question: {} };
    default:
      return state;
  }
};

export const questionDeleteReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true };
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true };
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const questionUpdateReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_UPDATE_REQUEST:
      return { loading: true };
    case QUESTION_UPDATE_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case QUESTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_UPDATE_RESET:
      return { question: {}, error: false };
    default:
      return state;
  }
};

export const questionMessageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_MESSAGE_REQUEST:
      return { loading: true };
    case QUESTION_CREATE_MESSAGE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_CREATE_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_CREATE_MESSAGE_RESET:
      return {};
    default:
      return state;
  }
};

export const questionAllReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case QUESTION_ALL_REQUEST:
      return { loading: true, questions: [] };
    case QUESTION_ALL_SUCCESS:
      return {
        loading: false,
        questions: action.payload.questions,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case QUESTION_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
