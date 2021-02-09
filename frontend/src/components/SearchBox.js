import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup, Form } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/home");
    }
  };
  return (
    <Form className="navbar-search" onSubmit={submitHandler}>
      <Form.Group id="topbarSearch">
        <InputGroup className="input-group-merge search-bar">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Questions..."
          />
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchBox;
