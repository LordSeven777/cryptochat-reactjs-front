import React from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

import ChatIllustration from "./ChatIllustration";
import LoginPage from "../LoginPage";

const LandingPage = () => {
  return (
    <section id="landing-page">
      <div className="landing">
        <div className="chat-illustration">
          <ChatIllustration />
        </div>
        <main className="px-3">
          <header className="mb-4">
            <h1 className="text-primary mb-3">Cryptochat</h1>
            <p className="lead">Message each other while being on a secure channel</p>
          </header>
          <div className="links">
            <Link to="/landing/auth/login" className="btn btn-primary mr-4 fw-600 btn-lg">
              Log in
              <FontAwesomeIcon icon="lock" className="ml-2" />
            </Link>
            <Link to="/landing/auth/signup" className="btn btn-light fw-600 btn-lg">
              Sign up
              <FontAwesomeIcon icon="pen-square" className="ml-2" />
            </Link>
          </div>
        </main>
      </div>
      <Route
        path="/landing/auth"
        render={() => (
          <section className="auth d-flex justify-content-center align-items-center">
            <Route path="/landing/auth/login" component={LoginPage} />
          </section>
        )}
      />
    </section>
  );
};

export default LandingPage;
