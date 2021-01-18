import React from "react";
import { Link } from "react-router-dom";
import { Badge, Card } from "react-bootstrap";
import DayJS from "react-dayjs";

const Question = ({ question }) => {
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
        <Card.Text as="p">
          {" "}
          Areas:{" "}
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
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Question;
