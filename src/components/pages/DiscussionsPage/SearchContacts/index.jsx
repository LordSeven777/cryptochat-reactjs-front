import React, { useEffect, useCallback, useRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

const SearchContacts = ({ isOpen, search, onOpen, onChange }) => {
  const formRef = useRef(null);
  const blurListenerRef = useRef(null);

  // Handles the blur on the input element
  const handleBlur = useCallback(
    (e) => {
      if (e.target.value === "") onOpen(false);
    },
    [onOpen]
  );

  useEffect(() => {
    if (isOpen) {
      if (blurListenerRef.current) window.removeEventListener("click", blurListenerRef.current);
      const blurListener = (e) => !e.target.contains(formRef.current) && handleBlur(e);
      blurListenerRef.current = blurListener;
      window.addEventListener("click", blurListener);
      return () => window.removeEventListener("click", blurListenerRef.current);
    }
  }, [isOpen, handleBlur]);

  return (
    <InputGroup id="search-contacts" className="mt-3">
      {!isOpen && (
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon="search" />
          </InputGroup.Text>
        </InputGroup.Prepend>
      )}
      {isOpen && (
        <div className="close-search d-flex align-items-center">
          <button
            type="button"
            className="d-flex justify-content-center align-items-center"
            onClick={() => onOpen(false)}
          >
            <FontAwesomeIcon icon="arrow-left" />
          </button>
        </div>
      )}
      <FormControl
        ref={formRef}
        type="search"
        className="app-input"
        placeholder="Search contacts"
        value={search}
        onChange={onChange}
        onFocus={onOpen}
      />
    </InputGroup>
  );
};

export default SearchContacts;
