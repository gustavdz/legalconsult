import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Question from "../components/Question";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listQuestions } from "../actions/questionActions";
import io from "socket.io-client";

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const [reload, setReload] = useState(false);
  const [response, setResponse] = useState("");
  //const ENDPOINT = "http://127.0.0.1:4001";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions, page, pages } = questionList;

  useEffect(() => {
    const socket = io();
    socket.on("identification", (data) => {
      setResponse(data);
    });
  }, []);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listQuestions(keyword, pageNumber));
      setReload(false);
    }
  }, [dispatch, keyword, pageNumber, history, userInfo, reload]);

  return (
    <>
      <Meta />
      {keyword && (
        <Link to="/home" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Lastest Questions - {response}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {userInfo &&
              questions.map((question) => (
                <Col key={question._id} sm={12}>
                  <Question
                    question={question}
                    userInfo={userInfo}
                    setReload={setReload}
                  />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
