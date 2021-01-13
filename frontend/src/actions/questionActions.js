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
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_CREATE_MESSAGE_REQUEST,
  QUESTION_CREATE_MESSAGE_SUCCESS,
  QUESTION_CREATE_MESSAGE_FAIL,
  QUESTION_TOP_SUCCESS,
  QUESTION_TOP_FAIL,
  QUESTION_TOP_REQUEST,
} from "../constants/questionConstants";
import axios from "axios";

export const listQuestions = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: QUESTION_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/questions?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch({
      type: QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listQuestionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/questions/${id}`);

    dispatch({
      type: QUESTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletequestion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/questions/${id}`, config);

    dispatch({
      type: QUESTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createquestion = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/questions`, {}, config);

    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatequestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/questions/${question._id}`,
      question,
      config
    );

    dispatch({
      type: QUESTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createQuestionMessage = (questionId, message) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUESTION_CREATE_MESSAGE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/questions/${questionId}/message`, message, config);

    dispatch({
      type: QUESTION_CREATE_MESSAGE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopquestions = () => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_TOP_REQUEST });
    const { data } = await axios.get(`/api/questions/top`);
    dispatch({
      type: QUESTION_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
