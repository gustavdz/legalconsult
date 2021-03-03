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

import { listUsers } from "../actions/userActions";

import { QUESTION_UPDATE_RESET } from "../constants/questionConstants";

const QuestionEditScreen = ({ match, history }) => {
  const questionId = match.params.id;

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [areas, setAreas] = useState(null);
  const [user, setUser] = useState({});
  const [usersAvailable, setUsersAvailable] = useState([]);

  const dispatch = useDispatch();

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = questionUpdate;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, users, error: errorUsers } = userList;

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

  const handleUserChange = (selectedOption) => {
    setUser(selectedOption);
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_UPDATE_RESET });
      history.push("/admin/questionlist");
    } else {
      if (!question.title || question._id !== questionId) {
        dispatch(listQuestionDetails(questionId));
        dispatch(listUsers());
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
        setUser({ value: question.user._id, label: question.user.name });
      }
      if (users && users.length > 0) {
        // console.log(users);
        setUsersAvailable(
          users.map((user) => {
            return { value: user._id, label: user.name };
          })
        );
      }
    }
  }, [dispatch, questionId, question, history, successUpdate, users]);

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
        Regresar
      </Link>
      <FormContainer>
        <h1>Editar el caso</h1>
        {loadingUpdate && <Loader />}
        {loadingUsers && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {errorUsers && <Message variant="danger">{errorUsers}</Message>}
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

            <Form.Group controlId="areas" style={{ marginBottom: "10px" }}>
              <Form.Label>Areas</Form.Label>
              <Select
                value={areas}
                placeholder="Select the areas..."
                onChange={handleAreaChange}
                options={areasAvailable}
                isMulti
                style={{ borderRadius: "0px" }}
              />
            </Form.Group>

            {users ? (
              <Form.Group controlId="user" style={{ marginBottom: "10px" }}>
                <Form.Label>User</Form.Label>
                <Select
                  value={user}
                  placeholder="Select the user..."
                  onChange={handleUserChange}
                  options={usersAvailable}
                  style={{ borderRadius: "0px" }}
                />
              </Form.Group>
            ) : (
              <Loader />
            )}

            <Button
              type="submit"
              variant="primary"
              style={{ marginBottom: "10px" }}
            >
              Grabar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default QuestionEditScreen;
