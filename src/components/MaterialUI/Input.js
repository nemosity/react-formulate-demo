import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Input = props => {
  return (
    <div className="formElement">
      <FormControl error={!!props.error} fullWidth>
        <FormLabel component="legend">{props.label}</FormLabel>
        <TextField
          fullWidth
          {...props}
          label={null}
          onChange={event => props.onChange(event.target.value)}
          margin="normal"
          variant="outlined"
        />
        {props.error && <FormHelperText>{props.error}</FormHelperText>}
      </FormControl>
    </div>
  )
}

export default Input;