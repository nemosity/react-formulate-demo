import React from 'react';
import Chroma from '../../chroma';

const Button = props => {
  return (
    <Chroma.ButtonGroup className="u-align-items--center u-justify-content--center">
      <Chroma.Button onClick={props.onClick} tertiary outline disabled={props.disabled}>
        {props.label}
      </Chroma.Button>
    </Chroma.ButtonGroup>
  );
}

export default Button;