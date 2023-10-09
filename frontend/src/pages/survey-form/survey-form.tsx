import { useState, useRef } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, TextField, Button, Grid, OutlinedInput } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';
import "./survey-form.css";
import DatePicker from '../../components/date-picker/date-picker';
import { DefaultFormStateType, BodyDataType } from '../../types/types';
import { defaultStateValues, userExperienceRatingSliderMarks, appGoalsValues } from '../../constants/constants';
import { isValidDate } from '../../utils/utils';


const SurveyForm = () => {

  const [state, setState] = useState<DefaultFormStateType>({ ...defaultStateValues });
  const [formErrorsState, setFormErrorsState] = useState({
    usageFrequencyErr: "", 
    appGoalsErr: "", 
    userExperienceRatingErr: "",
    dateOfBirthErr: ""
  });

  const { usageFrequency, appGoals, userExperienceRating, improvementSuggestions, dateOfBirth } = state;
  const { usageFrequencyErr, appGoalsErr, userExperienceRatingErr, dateOfBirthErr } = formErrorsState;

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    })
  }

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

      if (response.status === 201) {
        const submissionId = result["data"]["_id"];
        navigate(`/submission/${submissionId}`);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const isFormValid = () => {
    const errors = { ...formErrorsState };
    let isFormValid = true;
    if(!usageFrequency.length) {
      errors["usageFrequencyErr"] = "Please select this required field.";
      isFormValid = false;
    } else {
      errors["usageFrequencyErr"] = "";
    }
    if(!appGoals.length) {
      errors["appGoalsErr"] = "Please select this required field.";
      isFormValid = false;
    } else {
      errors["appGoalsErr"] = "";      
    }
    if(!userExperienceRating) {
      errors["userExperienceRatingErr"] = "Please select this required field.";
      isFormValid = false;
    } else {
      errors["userExperienceRatingErr"] = "";      
    } 
    if(dateOfBirth && !isValidDate(dateOfBirth)) {
      errors["dateOfBirthErr"] = "Age should be greater than 5years."
      isFormValid = false;
    } else {
      errors["dateOfBirthErr"] = "";      
    }
    setFormErrorsState(errors);
    return isFormValid;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const userExperienceRatingIndex = state["userExperienceRating"];
    const userExperienceRatingLabel = userExperienceRatingSliderMarks[userExperienceRatingIndex].hoverLabel;

    const dateOfBirth = state["dateOfBirth"] ? state["dateOfBirth"].toISOString() : null;

    const bodyData: BodyDataType = {
      ...state,
      userExperienceRating: userExperienceRatingLabel,
      dateOfBirth
    };
    if(isFormValid()) {
      sendFormAndRedirect(bodyData);
    }
  }

  return (
    <Grid 
      container 
      justifyContent="center"
    >
      <Grid 
        item xs={11} sm={8} md={7} lg={6}
        className="form-container"
      >
        
        <h1 className="heading">App Review Survey</h1>

        <form
          className="app-review-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormControl
            fullWidth
            className="usage-frequency-form-control form-control"
          >
            <InputLabel
              id="usage-frequency-dropdown-label"
            >
              1. How often do you use this app? <span className="required-indicator">*</span>
            </InputLabel>
            <Select
              displayEmpty
              labelId="usage-frequency-dropdown-label"
              renderValue={(selected) => {
                if(selected.length === 0) {
                  return <span>Select</span>
                }
                return (
                  <span>{selected}</span>
                )
              }
            }
              id="usage-frequency-dropdown"
              onChange={handleChange}
              name="usageFrequency"
              value={usageFrequency}
              label="1. How often do you use this app?"
            >
              <MenuItem value={"Daily"}>Daily</MenuItem>
              <MenuItem value={"Weekly"}>Weekly</MenuItem>
              <MenuItem value={"Monthly"}>Monthly</MenuItem>
              <MenuItem value={"Rarely"}>Rarely</MenuItem>
              <MenuItem value={"First Time"}>First Time</MenuItem>
            </Select>
            {usageFrequencyErr && <p className="error-p">{usageFrequencyErr}</p>}
          </FormControl>

          <FormControl
            fullWidth
            className="app-goals-form-control form-control"
          >
            <InputLabel
              id="appgoals-label"
            >
              2. Main app goal? <span className="required-indicator">*</span>
            </InputLabel>
            <Select
              labelId="appgoals-label"
              displayEmpty
              id="appgoals-dropdown"
              onChange={handleChange}            
              renderValue={(selected) => {
                  if(selected.length === 0) {
                    return <span>Select</span>
                  }
                  return (
                    <span>{selected.join(", ")}</span>
                  )
                }
              }
              name="appGoals"
              value={appGoals}
              label="2. Main app goal?"
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
            {appGoalsErr && <p className="error-p">{appGoalsErr}</p>}
          </FormControl>

          <FormControl
            fullWidth
            className="user-experience-slider-form-control form-control"
          >
            <label>
              3. Rate user experience (1-10): <span className="required-indicator">*</span>
            </label>
            <div className="user-experience-rating-slider-container">
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
            </div>
            {userExperienceRatingErr && <p className="error-p">{userExperienceRatingErr}</p>}
          </FormControl>

          <FormControl
            fullWidth
            className="improvement-suggestions-form-control form-control"
          >
            <label
              htmlFor="improvement-suggestions-textarea"
            >
              4. Suggest any improvements:
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
            errorString={dateOfBirthErr}
          />

          <div className="submit-btn-container"> 
            <Button
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </div>
          
        </form>
      </Grid>
    </Grid>
  )
}

export default SurveyForm;