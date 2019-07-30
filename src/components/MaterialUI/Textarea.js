import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Textarea = props => {
  return (
    <div className="formElement">
      <FormControl error={!!props.error} className="Textarea" fullWidth>
        <FormLabel component="legend">{props.label}</FormLabel>
        <TextField
          fullWidth
          {...props}
          label={null}
          onChange={event => props.onChange(event.target.value)}
          margin="normal"
          multiline
          rows={5}
          variant="outlined"
        />
        {props.error && <FormHelperText>{props.error}</FormHelperText>}
      </FormControl>
    </div>
  )
}

export default Textarea;