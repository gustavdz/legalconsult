import React, { useEffect } from "react";
import { Table, Row, Col, Button, Badge } from "@themesberg/react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

import { listUserQuestions } from "../actions/questionActions";
import { Link } from "react-router-dom";

const MyCasesScreen = ({ match, location, history }) => {
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionListUser = useSelector((state) => state.questionListUser);
  const {
    loading: loadingQuestions,
    error: errorQuestions,
    questions,
    page,
    pages,
  } = questionListUser;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listUserQuestions(userInfo._id, keyword, pageNumber));
    }
  }, [dispatch, history, userInfo, pageNumber, keyword]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Mis Casos</h1>
        </Col>
        <Col className="text-right">
          <Link to="/mycases/question/create" className="btn btn-primary my-3">
            <i className="fas fa-plus"></i> Crear un Caso
          </Link>
        </Col>
      </Row>
      {userInfo && (userInfo.isAdmin || userInfo.isLawyer) && (
        <Row>
          <Col xs={12}>
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
                        <td>
                          {question.detail.length > 50
                            ? question.detail.substring(0, 50) + "..."
                            : question.detail}
                        </td>
                        <td>
                          {question.areas.length > 0
                            ? question.areas.map((area) => {
                                return (
                                  <Badge
                                    bg="dark"
                                    key={area}
                                    className="badge-md me-1"
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
                            <Button className="btn-sm" variant="info">
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
                  isAdmin={true}
                  screen={"mycases"}
                />
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default MyCasesScreen;
