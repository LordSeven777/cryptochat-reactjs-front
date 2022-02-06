import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

const OptionsDropdwon = () => {
  const [isOpen, setOpen] = useState(false);

  const dropdwonRef = useRef(null);

  // Closes the dropdown if we click outside of it
  const closeModalOnOutsideClick = useCallback((e) => {
    if (!dropdwonRef) return;
    dropdwonRef.current && !dropdwonRef.current.contains(e.target) && setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("click", closeModalOnOutsideClick);
    return () => window.removeEventListener("click", closeModalOnOutsideClick);
  }, [closeModalOnOutsideClick]);

  const requestsNb = 8;
  const newRequestsNb = 2;
  const blockingsNb = 6;

  return (
    <div id="options-dropdown" ref={dropdwonRef}>
      <Button variant="light" className="toggler" onClick={() => setOpen(!isOpen)}>
        <FontAwesomeIcon icon="caret-down" />
        {newRequestsNb > 0 && <Badge variant="danger">{newRequestsNb}</Badge>}
      </Button>
      <div className="menu p-2 bg-dark-1 shadow-sm" style={{ display: isOpen ? "block" : "none" }}>
        <nav>
          <Link className="px-1 py-2 rounded-sm" to="/personal?tab=account">
            <FontAwesomeIcon icon="user-cog" className="mr-2" />
            My account
          </Link>
          <Link className="px-1 py-2 rounded-sm" to="/personal?tab=requests">
            <FontAwesomeIcon icon="user-clock" className="mr-2" />
            Requests
            <Badge
              variant={newRequestsNb > 0 ? "danger" : "secondary"}
              className="float-right mt-1"
            >
              {newRequestsNb > 0 ? newRequestsNb : requestsNb}
            </Badge>
          </Link>
          <Link className="px-1 py-2 rounded-sm" to="/personal?tab=blockings">
            <FontAwesomeIcon icon="user-slash" className="mr-2" />
            Blockings
            <Badge variant="secondary" className="float-right mt-1">
              {blockingsNb}
            </Badge>
          </Link>
        </nav>
        <hr />
        <div className="toggle-visibility px-1 py-2 rounded-sm">
          <FontAwesomeIcon icon="eye-slash" className="mr-2" />
          Hidden identity
          <Form.Check type="switch" className="float-right" checked={true} onChange={() => {}} />
        </div>
        <hr />
        <Button block variant="secondary" className="sign-out">
          <FontAwesomeIcon icon="sign-out-alt" className="mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default OptionsDropdwon;
