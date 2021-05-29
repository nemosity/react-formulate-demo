import Components from "../MaterialUI";

import React, { useState, useEffect } from "react";

const Dropdown = ({ src, ...props }) => {
  const [values, setValues] = useState([
    {
      label: "Loading...",
      value: "",
    },
  ]);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (src) {
      fetch(src)
        .then((response) => response.json())
        .then((data) => {
          return setTimeout(() => {
            setValues([{ label: "Please select", value: "" }, ...data]);
            setDisabled(false);
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  }, [src]);

  return (
    <Components.Select
      {...props}
      placeholder={props.placeholder || "Please select..."}
      values={values}
      className={disabled ? "disable-select" : null}
    />
  );
};

export default Dropdown;
