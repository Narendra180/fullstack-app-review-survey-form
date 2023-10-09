import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';
import { Moment } from 'moment';

type DatePickerProps = {
  onChange(event: any): void,
  name: string,
  value: Moment | null
}

const DatePicker = ({ onChange, name, value }: DatePickerProps) => {
  const handleChange = (value: any) => {
    onChange({target: { name, value }})
  }
  return (
    <FormControl
      fullWidth
    >
      <label
        htmlFor="date-picker-input"
      >
        5. Enter your birthday?
      </label>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MuiDatePicker
          slotProps={{
            field: {
              id: "date-picker-input",
              onChange: handleChange
            }
          }}
          onChange={handleChange}
          value={value}
        />
      </LocalizationProvider>
    </FormControl>
  )
}

export default DatePicker;