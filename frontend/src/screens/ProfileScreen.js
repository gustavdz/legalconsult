import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Form, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import {
  listUserQuestions,
  listCreatedByQuestions,
} from "../actions/questionActions";

const ProfileScreen = ({ match, location, history }) => {
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const questionListUser = useSelector((state) => state.questionListUser);
  const {
    loading: loadingQuestions,
    error: errorQuestions,
    questions,
    page,
    pages,
  } = questionListUser;

  const questionListCreatedBy = useSelector(
    (state) => state.questionListCreatedBy
  );
  const {
    loading: loadingQuestionsAsked,
    error: errorQuestionsAsked,
    questions: questionsAsked,
    page: pageAsked,
    pages: pagesAsked,
  } = questionListCreatedBy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (user._id !== userInfo._id || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        (userInfo.isAdmin || userInfo.isLawyer) &&
          dispatch(listUserQuestions(userInfo._id, keyword, pageNumber));
        userInfo.isCustomer &&
          dispatch(listCreatedByQuestions(userInfo._id, keyword, pageNumber));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success, pageNumber, keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <Row>
          {userInfo && (userInfo.isAdmin || userInfo.isLawyer) && (
            <Col xs={12}>
              <h2>My Taken Questions</h2>
              {loadingQuestions ? (
                <Loader />
              ) : errorQuestions ? (
                <Message variant="danger">{errorQuestions}</Message>
              ) : (
                <>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>CREATED</th>
                        <th>TITLE</th>
                        <th>DETAILS</th>
                        <th>AREAS</th>
                        <th>TAKEN</th>
                        <th>PAID</th>
                        <th>CLOSED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((question, index) => (
                        <tr key={question._id}>
                          <td>{question.createdAt.substring(0, 10)}</td>
                          <td>{question.title}</td>
                          <td>{question.detail}</td>
                          <td>
                            {question.areas.length > 0
                              ? question.areas.map((area) => {
                                  return (
                                    <Badge
                                      variant="info"
                                      key={area}
                                      style={{ marginRight: "10px" }}
                                    >
                                      {area}
                                    </Badge>
                                  );
                                })
                              : "N/A"}
                          </td>
                          <td>
                            {question.isTaken ? (
                              question.takenAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {question.isPaid ? (
                              question.paidAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {question.isClosed ? (
                              question.closedAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/question/${question._id}`}>
                              <Button className="btn-sm" variant="light">
                                DETAILS
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ""}
                  />
                </>
              )}
            </Col>
          )}
          {userInfo && (userInfo.isAdmin || userInfo.isCustomer) && (
            <Col xs={12}>
              <h2>My Asked Questions</h2>
              {loadingQuestionsAsked ? (
                <Loader />
              ) : errorQuestionsAsked ? (
                <Message variant="danger">{errorQuestionsAsked}</Message>
              ) : (
                <>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>CREATED</th>
                        <th>TITLE</th>
                        <th>DETAILS</th>
                        <th>AREAS</th>
                        <th>TAKEN</th>
                        <th>PAID</th>
                        <th>CLOSED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionsAsked.map((question, index) => (
                        <tr key={question._id}>
                          <td>{question.createdAt.substring(0, 10)}</td>
                          <td>{question.title}</td>
                          <td>{question.detail}</td>
                          <td>
                            {question.areas.length > 0
                              ? question.areas.map((area) => {
                                  return (
                                    <Badge
                                      variant="info"
                                      key={area}
                                      style={{ marginRight: "10px" }}
                                    >
                                      {area}
                                    </Badge>
                                  );
                                })
                              : "N/A"}
                          </td>
                          <td>
                            {question.isTaken && question.takenAt ? (
                              question.takenAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {question.isPaid ? (
                              question.paidAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {question.isClosed ? (
                              question.closedAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/question/${question._id}`}>
                              <Button className="btn-sm" variant="light">
                                DETAILS
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginate
                    pages={pagesAsked}
                    page={pageAsked}
                    keyword={keyword ? keyword : ""}
                  />
                </>
              )}
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
