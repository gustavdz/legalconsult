import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Badge, Card } from "@themesberg/react-bootstrap";
import DayJS from "react-dayjs";
import { takeQuestion } from "../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import { QUESTION_UPDATE_RESET } from "../constants/questionConstants";

const Question = ({ question, userInfo, setReload }) => {
  const dispatch = useDispatch();

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    // loading: loadingUpdate,
    // error: errorUpdate,
    success: successUpdate,
  } = questionUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_UPDATE_RESET });
      const reloadQuestions = () => setReload(true);
      reloadQuestions();
    }
  }, [dispatch, successUpdate, setReload]);

  const handleTakeCase = (questionId) => {
    //console.log({ questionId, userId });
    dispatch(
      takeQuestion({
        _id: questionId,
      })
    );
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Link to={`/question/${question._id}`}>
          <Card.Title as="div">
            <h2>{question.title}</h2>
          </Card.Title>
        </Link>
        <Card.Text as="p">{question.detail}</Card.Text>
        <Card.Text as="p" className="text-right">
          {" "}
          by <strong>{question.user.name}</strong>
          {" | "}
          {<DayJS format="YYYY-MM-DD HH:mm:ss">{question.createdAt}</DayJS>}
        </Card.Text>
        <hr />
        <Card.Text as="div">
          <Row>
            <Col xs={12} md={10}>
              Areas:{" "}
              {question.areas.length > 0
                ? question.areas.map((area, i) => {
                    return (
                      <Badge key={i} className="badge-md me-1 bg-dark">
                        {area}
                      </Badge>
                    );
                  })
                : "N/A"}
            </Col>
            <Col xs={12} md={2}>
              {userInfo && (userInfo.isLawyer || userInfo.isAdmin) && (
                <Button
                  variant="success"
                  onClick={() => handleTakeCase(question._id)}
                >
                  Take the case
                </Button>
              )}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Question;
