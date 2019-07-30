import React, { createElement } from 'react';
import { Repeater } from '@nemosity/react-formulate';
import  Button from '../components/Button';
import Dropdown from '../components/Dropdown';

import Chroma from '../chroma';
import _get from 'lodash/get';

import chromaComponentMap from '../chroma';
chromaComponentMap.Dropdown = Dropdown;

/* Provides a consistent interface for Chroma Components
* props {
*   onChange(payload),
*   onBlur()
*   error
*   label
*   placeholder
*   defaultValue
* }
**/

const generateComponent = type => {
  const CustomComponent = props => {
    const onChange = (payload, data) => props.onChange(data || _get(payload, 'target.value')) // data used by datepicker
    return (
      <Chroma.FormGroup label={props.label} error={props.error} for={props.id}>
        {createElement(chromaComponentMap[type], {
          ...props,
          onChange, error: !!props.error,
          name: props.id,
          className: !!props.error ? 'is-invalid' : null
        })}
      </Chroma.FormGroup>
    )
  }
  CustomComponent.displayName = type;
  return CustomComponent;
}

const components = {
  Repeater: Repeater,
  Button: Button
}

export default new Proxy(components, {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      components[prop] = generateComponent(prop);
      return components[prop]
    }
  }
});
