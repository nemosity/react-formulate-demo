import React from 'react';

import MUIRadio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Radio = props => {
  return (
    <div className="formElement">
      <FormControl error={!!props.error} component="fieldset">
        <FormLabel component="legend">{props.label}</FormLabel>
        <RadioGroup
          {...props}
          aria-label={props.label}
          name={props.id}
          onChange={event => props.onChange(event.target.value)}
        >
          {props.values.map((value, index) => {
            return (
              <FormControlLabel
                key={index}
                value={value.value}
                control={<MUIRadio />}
                label={value.label}
              />
            );
          })}
        </RadioGroup>
        {props.error && <FormHelperText>{props.error}</FormHelperText>}
      </FormControl>
    </div>
  )
}

export default Radio;