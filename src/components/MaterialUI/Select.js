import React from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MUIInput from '@material-ui/core/Input';
import MUISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Select = props => {
  return (
    <div className="formElement">
      <FormControl error={!!props.error} className="selectComponent" fullWidth>
        <FormLabel component="legend">{props.label}</FormLabel>
        <MUISelect
          fullWidth
          {...props}
          label={null}
          onChange={event => props.onChange(event.target.value)}
          input={<MUIInput name={props.name} id={props.id} labelWidth={120} />}
        >
          {props.values.map((value, index) => {
            return (
              <MenuItem key={index} value={value.value}>{value.label}</MenuItem>
            )
          })}
        </MUISelect>
        {props.error && <FormHelperText>{props.error}</FormHelperText>}
      </FormControl>
    </div>
  )
}

export default Select;