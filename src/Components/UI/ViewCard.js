import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewCard.css";
import ACTIONS from "../../Constant/constant";

function ViewCard({ user, dispatch }) {
  const [editId, setEditId] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(() => user.email);
  }, [user.email]);

  const saveData = (id) => {
    dispatch({ type: ACTIONS.SAVE_DATA, payload: { id, email: input } });
    setEditId("");
  };
  return (
    <Card bg="dark" className="card--align">
      <Card.Body>
        <div>{user.gender}</div>
        <div>First Name : {user.name.first.substring(0, 1)}</div>
        <div>Last Name : {user.name.last}</div>
        <div>
          Location : {user.location.city} - {user.location.state} -{" "}
          {user.location.country}
        </div>
        {editId ? (
          <Form.Group className="form-align">
            <Form.Control
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
        ) : (
          <div>Email: {user.email}</div>
        )}
      </Card.Body>
      {editId ? (
        <div>
          <Button
            className="btn-align"
            onClick={() => saveData(user.id.value)}
            variant="success"
          >
            Save
          </Button>
          <Button onClick={() => setEditId("")} variant="warning">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className="btn-align"
            variant="info"
            onClick={() => {
              console.log(user.id.value);
              setEditId(user.id.value);
            }}
          >
            Edit
          </Button>
        </div>
      )}
    </Card>
  );
}

export default ViewCard;
