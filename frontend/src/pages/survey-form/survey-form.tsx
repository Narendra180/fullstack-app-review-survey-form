import { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, TextField, Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';
import "./survey-form.css";
import DatePicker from '../../components/date-picker/date-picker';
import { DefaultFormStateType, BodyDataType } from '../../types/types';
import { defaultStateValues, userExperienceRatingSliderMarks, appGoalsValues } from '../../constants/constants';


const SurveyForm = () => {

  const [state, setState] = useState<DefaultFormStateType>({...defaultStateValues});

  const { usageFrequency, appGoals, userExperienceRating, improvementSuggestions, dateOfBirth } = state;

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    })
    // console.log(name, value)
  }
  useEffect(() => {
    console.log(state)
  })

  const sendFormAndRedirect = async (bodyData: BodyDataType) => {
    try {
      const response = await fetch("/api/v1/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });
      const result = await response.json();

      if(response.status === 201) {
        const submissionId = result["data"]["_id"];
        navigate(`/submission/${submissionId}`);
      } else {
        console.log(result);
      }      
    } catch(err) {
      console.log(err);
    }
  }


  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(state)

    const userExperienceRatingIndex = state["userExperienceRating"];
    const userExperienceRatingLabel = userExperienceRatingSliderMarks[userExperienceRatingIndex].hoverLabel;

    const dateOfBirth = state["dateOfBirth"]? state["dateOfBirth"].toISOString(): null;

    const bodyData: BodyDataType = {
                                      ...state,
                                      userExperienceRating: userExperienceRatingLabel,
                                      dateOfBirth
                                    };
    sendFormAndRedirect(bodyData);                                    
    console.log("Handle submit");
    console.log(state)
  }

  return (
    <div className="form-container">
      <h1>App Review Survey</h1>

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
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
            name="usageFrequency"   
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
            renderValue={(selected) => selected.join(', ')}
            name="appGoals"         
            value={appGoals}
            label="1. How often do you use this app?"
            multiple
          >
            {
              appGoalsValues.map((goal) => {
                const checked = appGoals.indexOf(goal) > -1;
                return (
                  <MenuItem key={goal} value={goal}>
                    <Checkbox checked={checked} />
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
            name="improvementSuggestions"
            value={improvementSuggestions}
            id="improvement-suggestions-textarea"            
            multiline
            rows={4}
            onChange={handleChange}
          />
        </FormControl>

        <DatePicker 
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleChange}
        />

        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default SurveyForm;