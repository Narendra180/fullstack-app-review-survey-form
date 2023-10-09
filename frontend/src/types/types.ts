import { Moment } from "moment"

export type DefaultFormStateType = {
  usageFrequency: string,
  appGoals: string[],
  userExperienceRating: number,
  improvementSuggestions: string,
  dateOfBirth: Moment | null
}



export type BodyDataType = {
  usageFrequency: string,
  appGoals: string[],
  userExperienceRating: string,
  improvementSuggestions: string,
  dateOfBirth: string | null
}
