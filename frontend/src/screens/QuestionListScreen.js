import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Badge } from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listAllQuestions,
  deleteQuestion,
  createQuestion,
} from "../actions/questionActions";
import {
  QUESTION_CREATE_RESET,
  QUESTION_DETAILS_RESET,
} from "../constants/questionConstants";

const QuestionListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const questionAll = useSelector((state) => state.questionAll);
  const { loading, error, questions, page, pages } = questionAll;

  const questionDelete = useSelector((state) => state.questionDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = questionDelete;

  const questionCreate = useSelector((state) => state.questionCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    question: createdQuestion,
  } = questionCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: QUESTION_CREATE_RESET });
    dispatch({ type: QUESTION_DETAILS_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/question/${createdQuestion._id}/edit`);
    } else {
      dispatch(listAllQuestions("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdQuestion,
    pageNumber,
  ]);

  const createQuestionHandler = () => {
    dispatch(createQuestion());
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete the question?")) {
      dispatch(deleteQuestion(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Questions</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createQuestionHandler}>
            <i className="fas fa-plus"></i> Create Question
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>DETAIL</th>
                <th>AREAS</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question._id}>
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
                    <LinkContainer to={`/admin/question/${question._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleteHandler(question._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default QuestionListScreen;
