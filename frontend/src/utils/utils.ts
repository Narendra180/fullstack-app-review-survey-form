import { Moment } from "moment";

export const isValidDate = (date: Moment) => {
  const receivedDate = date.toDate();
  const presentDate = new Date();
  const presentYear = presentDate.getFullYear();
  const minDate = new Date(presentYear - 100, 0);
  const maxDate = new Date(new Date().setFullYear(presentYear - 5))

  if(receivedDate <= maxDate && receivedDate >= minDate) {
    return true;
  } else {
    return false;
  }
}