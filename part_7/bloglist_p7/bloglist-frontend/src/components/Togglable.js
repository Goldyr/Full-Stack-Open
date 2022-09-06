import { useState, forwardRef, useImperativeHandle } from "react";

import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={hideWhenVisible}>
        <Button
          variant="primary"
          size="lg"
          onClick={toggleVisibility}
          id={props.buttonId}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="secondary"
          size="lg"
          onClick={toggleVisibility}
          id={props.buttonId}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
