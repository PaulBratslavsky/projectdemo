import React, { useContext } from "react";
import BackButton from "../BackButton/backButton";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import useFormFields from "../../hooks/useFormFields";
import useMutation from "../../hooks/useMutation";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const INITIAL_FORM_STATE = {
  identifier: "",
  password: "",
};

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const { fields, handleSetFields } =
    useFormFields(INITIAL_FORM_STATE);
  const [login, { loading, error }] = useMutation(
    `http://localhost:1337/auth/local`
  );

  function handleSubmit(event) {
    event.preventDefault();
    login({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    }).then((data) => {
      if (data.user) setUser(data);
    });
  }

  if (user) return <Navigate to="/" />;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="identifier"
              value={fields.idenifier}
              onChange={handleSetFields}
              type="email"
              placeholder="Email"
              autoComplete="Email"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridGitHub1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={fields.password}
              onChange={handleSetFields}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div className="text-danger d-flex justify-content-center">
            {error && error.message[0].messages[0].message}
            {loading && <Spinner animation="grow" variant="info" />}
          </div>
        </fieldset>
      </Form>
      <BackButton />
    </div>
  );
}
