import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  Badge,
} from "@themesberg/react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  listQuestionDetails,
  createQuestionMessage,
  takeQuestion,
} from "../actions/questionActions";
import { QUESTION_CREATE_MESSAGE_RESET } from "../constants/questionConstants";
import DayJS from "react-dayjs";

const QuestionScreen = ({ history, match }) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = questionUpdate;

  const questionMessageCreate = useSelector(
    (state) => state.questionMessageCreate
  );
  const {
    success: successQuestionMessage,
    loading: loadingQuestionMessage,
    error: errorQuestionMessage,
  } = questionMessageCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      // console.log(userInfo);
      if (successQuestionMessage) {
        setMessage("");
      }
      dispatch(listQuestionDetails(match.params.id));
      dispatch({ type: QUESTION_CREATE_MESSAGE_RESET });
      // console.info(history);
    }
  }, [
    dispatch,
    match,
    successQuestionMessage,
    userInfo,
    history,
    successUpdate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createQuestionMessage(match.params.id, {
        message,
      })
    );
  };

  const handleTakeCase = (questionId) => {
    //console.log({ questionId, userId });
    dispatch(
      takeQuestion({
        _id: questionId,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/home">
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {!question && loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <h3>{question.title}</h3>
                <ListGroup.Item className="word-wrap">
                  <h5>{question.detail}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  Areas:{" "}
                  {question && question.areas && question.areas.length > 0
                    ? question.areas.map((area) => {
                        return (
                          <Badge
                            variant="dark"
                            key={area}
                            className="badge-md me-1 bg-dark"
                          >
                            {area}
                          </Badge>
                        );
                      })
                    : "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    by <strong>{question.user && question.user.name}</strong>
                    {" | "}
                    {
                      <DayJS format="YYYY-MM-DD HH:mm:ss">
                        {question.createdAt}
                      </DayJS>
                    }
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={6}>
              <h3>Messages</h3>
              {question.takenBy ? (
                question.takenBy._id !== userInfo._id ? (
                  <>
                    <Message>Question has not been taken by you</Message>
                  </>
                ) : (
                  <ListGroup variant="flush" className="chatbox">
                    {question.messages.length === 0 && (
                      <Message>No Messages</Message>
                    )}
                    {question.messages.map((message) => (
                      <ListGroup.Item key={message._id} className="word-wrap">
                        <p>{message.message}</p>
                        <p>
                          by <strong>{message.user.name}</strong>
                          {" | "}
                          {
                            <DayJS format="YYYY-MM-DD HH:mm:ss">
                              {message.createdAt}
                            </DayJS>
                          }
                        </p>
                      </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                      <h2>Write a Message</h2>
                      {successQuestionMessage && (
                        <Message variant="success">
                          Message sent successfully
                        </Message>
                      )}
                      {loadingQuestionMessage && <Loader />}
                      {errorQuestionMessage && (
                        <Message variant="danger">
                          {errorQuestionMessage}
                        </Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingQuestionMessage}
                            type="submit"
                            variant="primary"
                          >
                            Send
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to send a
                          message{" "}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                )
              ) : (
                <>
                  <Message>The question has not been taken.</Message>
                  {userInfo && (userInfo.isLawyer || userInfo.isAdmin) && (
                    <div className="text-right">
                      <Button
                        variant="success"
                        onClick={() => handleTakeCase(question._id)}
                      >
                        Take the case
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default QuestionScreen;
