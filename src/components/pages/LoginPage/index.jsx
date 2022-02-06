import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

import useLogin from "../../../hooks/useLogin";

const LoginPage = () => {
  const {
    loading,
    identifier,
    password,
    feedbacks,
    handleChange,
    handleSubmit
  } = useLogin();

  return (
    <section id="login-page">
      <h2>Log in</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>E-mail address / Pseudo:</Form.Label>
          <Form.Control
            type="email"
            placeholder="tolotor@yahoo.fr | mbrLee98"
            className="app-input"
            value={identifier}
            onChange={handleChange("identifier")}
            isInvalid={Boolean(feedbacks.identifier)}
          />
          {feedbacks.identifier && (
            <Form.Control.Feedback type="invalid">
              {feedbacks.identifier}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            className="app-input"
            value={password}
            onChange={handleChange("password")}
            isInvalid={Boolean(feedbacks.password)}
          />
          {feedbacks.password && (
            <Form.Control.Feedback type="invalid">
              {feedbacks.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Button type="submit" block className="fw-600" disabled={loading}>
            <FontAwesomeIcon icon="lock" className="mr-2" />
            Authenticate
            {loading && (
              <Spinner
                size="sm"
                variant="dark"
                animation="border"
                role="status"
              />
            )}
          </Button>
        </Form.Group>
      </Form>
      <p>
        <small>
          Haven't you created an account yet?{" "}
          <Link to="/landing/auth/signup">Sign up</Link>
        </small>
      </p>
    </section>
  );
};

export default LoginPage;
