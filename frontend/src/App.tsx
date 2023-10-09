import HouseIcon from '@mui/icons-material/House';
import { Link, Outlet } from "react-router-dom";


import './App.css'

function App() {
  return (
    <div className="app-component">
      <header className="app-header">
        <Link to="/">
          <HouseIcon fontSize='medium'/> 
          <span> Home</span>
        </Link>
      </header>
      <Outlet />
    </div>
  )
  
}

export default App
