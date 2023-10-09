import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Checkbox, Grid, ListItemText, MenuItem, Slider } from "@mui/material";
import { appGoalsValues, userExperienceRatingSliderMarks } from "../../constants/constants";
import "./submission-result.css";
import { BodyDataType } from "../../types/types";
import { capitalizeFirstLetter } from "../../utils/utils";

const SubmissionResult = () => {
  const params = useParams();

  const submissionId = params.id;

  const [isLoading, setIsLoading] = useState(false);

  const [submissionData, setSubmissionData] = useState<BodyDataType | null>(null);

  const fetchSubmission = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/survey/${submissionId}`);
      const resultObj = await response.json();
      setSubmissionData(resultObj.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchSubmission();
  }, []);


  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item xs={11} sm={8} md={7} lg={6}
        className="submission-result-page-container"
      >
        <h1 className="submission-result-heading">Form Submission Result</h1>

        {
          isLoading
            ? (
              <p>Loading...</p>
            ) : (
              submissionData &&
              <div className="results-container">
                <div className="usage-frequency-result-container result-container">
                  <h2 className="question-heading">1. How often do you use this app?</h2>
                  <p className="selected-answer-p">{`A. ${capitalizeFirstLetter(submissionData.usageFrequency)}`}</p>
                </div>
                <div className="appGoals-result-container result-container">
                  <h2 className="question-heading">2. Main app goal?</h2>
                  <div>
                    {
                      appGoalsValues.map((goal) => {
                        const isChecked = submissionData.appGoals.includes(goal.toLowerCase());
                        return (
                          <MenuItem key={goal}>
                            <Checkbox checked={isChecked} />
                            <ListItemText primary={goal} />
                          </MenuItem>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="userExperienceRating-result-container result-container">
                  <h2 className="question-heading">3. Rate User Experience(1-10): </h2>
                  <div className="user-experience-rating-slider-container">
                    <Slider
                      id="user-experience-rating-slider"
                      aria-label="User Experience Rating marks"
                      getAriaValueText={(value) => `${value}`}
                      step={1}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => userExperienceRatingSliderMarks[value].hoverLabel}
                      marks={userExperienceRatingSliderMarks}
                      min={1}
                      max={10}
                      name="userExperienceRating"
                      value={
                        userExperienceRatingSliderMarks.find(obj => {
                          return obj.hoverLabel === capitalizeFirstLetter(submissionData.userExperienceRating)
                        })?.value
                      }                      
                    />
                  </div>                
                </div>
                {
                  submissionData.improvementSuggestions &&
                  <div className="usage-frequency-result-container result-container">
                    <h2 className="question-heading">4. Suggest any improvements: </h2>
                    <p className="selected-answer-p">{`A. ${submissionData.improvementSuggestions}`}</p>
                  </div>
                }
                {
                  submissionData.dateOfBirth &&
                  <div className="usage-frequency-result-container result-container">
                    <h2 className="question-heading">5. Enter your birthday?</h2>
                    <p className="selected-answer-p">{`A. ${new Date(submissionData.dateOfBirth).toDateString()}`}</p>
                  </div>
                }
              </div>
            )
        }

      </Grid>
    </Grid>
  )
}

export default SubmissionResult;