import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import {
  listQuestionDetails,
  updateQuestion,
} from "../actions/questionActions";

import { QUESTION_UPDATE_RESET } from "../constants/questionConstants";

const QuestionEditScreen = ({ match, history }) => {
  const questionId = match.params.id;

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [areas, setAreas] = useState(null);

  const dispatch = useDispatch();

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = questionUpdate;

  const areasAvailable = [
    { value: "Administrativo", label: "Administrativo" },
    { value: "Civil", label: "Civil" },
    { value: "Familia", label: "Familia" },
    { value: "Laboral", label: "Laboral" },
    { value: "Penal", label: "Penal" },
    { value: "Societario", label: "Societario" },
    { value: "Tránsito", label: "Tránsito" },
    { value: "Tributario", label: "Tributario" },
    { value: "Otros", label: "Otros" },
  ];

  const handleAreaChange = (selectedOption) => {
    setAreas(selectedOption);
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_UPDATE_RESET });
      history.push("/admin/questionlist");
    } else {
      if (!question.title || question._id !== questionId) {
        dispatch(listQuestionDetails(questionId));
      } else {
        setTitle(question.title);
        setDetail(question.detail);

        setIsPaid(false);
        setIsTaken(false);
        setIsClosed(false);
        setAreas(
          question.areas.map((x) => {
            return { value: x, label: x };
          })
        );
      }
    }
  }, [dispatch, questionId, question, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateQuestion({
        _id: questionId,
        title,
        detail,
        areas: areas && areas.length > 0 ? areas.map((x) => x.value) : [],
        isPaid,
        isClosed,
        isTaken,
      })
    );
  };

  return (
    <>
      <Link to="/admin/questionlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Question</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="detail">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details"
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="areas">
              <Form.Label>Areas</Form.Label>

              <Select
                value={areas}
                onChange={handleAreaChange}
                options={areasAvailable}
                isMulti
                style={{ borderRadius: "0px" }}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default QuestionEditScreen;
