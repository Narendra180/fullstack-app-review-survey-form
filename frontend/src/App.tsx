import { Outlet } from "react-router-dom";
import SurveyForm from "./pages/survey-form/survey-form";
import SubmissionResult from "./pages/submission-result/submission-result";
import './App.css'

function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
  
}

export default App
