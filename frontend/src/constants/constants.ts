import { DefaultFormStateType } from "../types/types";

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

const defaultStateValues:DefaultFormStateType = {
  usageFrequency: "",
  appGoals: [],
  userExperienceRating: 0,
  improvementSuggestions: "",
  dateOfBirth: null
}

export { appGoalsValues, userExperienceRatingSliderMarks, defaultStateValues }