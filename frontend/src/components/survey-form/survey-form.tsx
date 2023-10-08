import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./survey-form.css";


const appGoalsValues:string[] = [
  "Information",
  "Chat",
  "Entertainment",
  "Buy",
  "Socialize",
  "Others"
]

const userExperienceRatingSliderMarks = [
  {
    value: 0,
    label: "None",
    hoverLabel: "Select a value"
  },
  {
    value: 1,
    label: "1",
    hoverLabel: "Very Bad",
  },
  {
    value: 2,
    label: "2",
    hoverLabel: "Bad",
  },
  {
    value: 3,
    label: "3",
    hoverLabel: "Not Good",
  },
  {
    value: 4,
    label: "4",
    hoverLabel: "Okay",
  },
  {
    value: 5,
    label: "5",
    hoverLabel: "Good"
  },
  {
    value: 6,
    label: "6",
    hoverLabel: "Very Good"
  },
  {
    value: 7,
    label: "7",
    hoverLabel: "Excellent"
  },
  {
    value: 8,
    label: "8",
    hoverLabel: "Outstanding"
  },
  {
    value: 9,
    label: "9",
    hoverLabel: "Exceptional"
  },
  {
    value: 10,
    label: "10",
    hoverLabel: "Perfect"
  }
]


const SurveyForm = () => {

  const [state, setState] = useState({
    usageFrequency: "",
    appGoals: [],
    userExperienceRating: 0,
    improvementSuggestions: "",
    dateOfBirth: ""
  });

  const { usageFrequency, appGoals, userExperienceRating, improvementSuggestions, dateOfBirth } = state;

  const handleChange = (event) => {
    console.log(event)
  }
  return (
    <div className="form-container">
      <h1>App Review Survey</h1>

      <form>
        <FormControl
          fullWidth
        >
          <InputLabel
            id="usage-frequency-dropdown-label"
          >
            1. How often do you use this app?
          </InputLabel>
          <Select
            labelId="usage-frequency-dropdown-label"
            id="usage-frequency-dropdown"
            onChange={handleChange}      
            name="usage-frequency"   
            value={usageFrequency}
            label="1. How often do you use this app?"
          >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"weekly"}>Weekly</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
            <MenuItem value={"rarely"}>Rarely</MenuItem>
            <MenuItem value={"first time"}>First Time</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
        >
          <InputLabel
            id="appgoal-label"
          >
            2. Main app goal?
          </InputLabel>
          <Select
            labelId="appgoal-label"
            id="appgoal-dropdown"
            onChange={handleChange}
            name="appGoals"         
            value={appGoals}
            label="1. How often do you use this app?"
            multiple
          >
            {
              appGoalsValues.map((goal) => {
                return (
                  <MenuItem key={goal} value={goal}>
                    <Checkbox checked={appGoals.indexOf(goal.toLowerCase()) > -1} />
                    <ListItemText primary={goal} />
                  </MenuItem>
                )
              })
            }
          </Select>
        </FormControl>

        <FormControl
          fullWidth
        >
          <label htmlFor="user-experience-rating-slider">
            3.Rate user experience (1-10):
          </label>
          <Slider
            id="user-experience-rating-slider"
            aria-label="User Experience Rating marks"
            getAriaValueText={(value) => `${value}`}
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => userExperienceRatingSliderMarks[value].hoverLabel}
            marks={userExperienceRatingSliderMarks}
            min={0}
            max={10}
            name="userExperienceRating"
            value={userExperienceRating}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl 
          fullWidth
        >
          <label
            htmlFor="improvement-suggestions-textarea"
          >
            4.Suggest any improvements:
          </label>
          <TextField
            id="improvement-suggestions-textarea"
            multiline
            rows={4}
            defaultValue="Default Value"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl
          fullWidth
        >
          <label
            htmlFor="date-picker-input"
          >
            5. Enter your birthday?
          </label>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              slotProps={{
                field: {
                  id: "date-picker-input",
                  onChange: (value) => console.log(value)
                }
              }}
              onChange={handleChange}
            />
          </LocalizationProvider>
        </FormControl>
      </form>
    </div>
  )
}

export default SurveyForm;