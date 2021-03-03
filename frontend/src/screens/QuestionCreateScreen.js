import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { createQuestionByMe } from "../actions/questionActions";

import { listUsers } from "../actions/userActions";

import { QUESTION_CREATE_RESET } from "../constants/questionConstants";

const QuestionCreateScreen = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const [areas, setAreas] = useState(null);
  const [user, setUser] = useState("");
  const [usersAvailable, setUsersAvailable] = useState([]);

  const dispatch = useDispatch();

  const questionCreate = useSelector((state) => state.questionCreate);
  const { loading, error, success } = questionCreate;

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
    if (success) {
      dispatch({ type: QUESTION_CREATE_RESET });
      history.push("/mycases");
    } else {
      if (users && users.length > 0) {
        // console.log(users);
        setUsersAvailable(
          users.map((user) => {
            return { value: user._id, label: user.name };
          })
        );
      } else {
        dispatch(listUsers());
      }
    }
  }, [dispatch, history, success, users]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createQuestionByMe({
        title,
        detail,
        areas: areas && areas.length > 0 ? areas.map((x) => x.value) : [],
        user: user.value,
      })
    );
  };

  return (
    <>
      <Link to="/mycases" className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Nuevo caso</h1>
        {loadingUsers && <Loader />}
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
                style={{ marginBottom: "10px" }}
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
                style={{ marginBottom: "10px" }}
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
                style={{ borderRadius: "0px", marginBottom: "10px" }}
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
                  style={{ borderRadius: "0px", marginBottom: "10px" }}
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

export default QuestionCreateScreen;
