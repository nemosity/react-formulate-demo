import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const Datepicker = props => {

  const handleDateChange = date => {
    props.onChange(date);
  }

  const setDefaultDate = () => {
    const now = new Date().toISOString();
    props.onChange(now);
    return now;
  }

  return (
    <div className="formElement">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            label="Date picker"
            value={props.value || setDefaultDate()}
            onChange={handleDateChange}
          />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default Datepicker;