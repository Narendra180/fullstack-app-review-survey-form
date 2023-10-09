import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import SurveyForm from './pages/survey-form/survey-form.tsx'
import SubmissionResult from './pages/submission-result/submission-result.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'


const theme = createTheme({
  palette: {
    primary: {
      main: "#2b2b2b",
    },
  },
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SurveyForm />
      },
      {
        path: "/submission/:id",
        element: <SubmissionResult />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
