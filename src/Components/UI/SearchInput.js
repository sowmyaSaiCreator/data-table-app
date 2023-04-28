import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SearchInput.css";
import { Search } from "react-bootstrap-icons";
import ACTIONS from "../../Constant/constant";

const SearchInput = ({ dispatch }) => {
  const [input, setInput] = useState("");
  const handleSearch = (sValue) => {
    setInput(sValue);
    dispatch({ type: ACTIONS.SEARCH_LIST, payload: { value: sValue } });
  };
  return (
    <InputGroup className="mb-3 input--align">
      <Form.Control
        placeholder="Search using last name"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <InputGroup.Text
        variant="success"
        id="basic-addon1"
        value=" "
        onClick={(e) => handleSearch(e.target.value)}
      >
        <Search />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchInput;
