import React from 'react';
import { Link } from 'react-router-dom';
import { Global } from './Modules'

export const App = () => {

  const globalState = Global({pageName: "Home", description:"{Home} => Daniel Assayag is an Artist and Project Leader in Education. (2022) {Paris-Casablanca}. [Experimentations, Daily Artivities, Retrospective]."})

  return (
    
    <div id="main-container">
      
      <div id="main-container-header">
        <div id="main-container-header-title">
          <h1>Home</h1>
        </div>
        
        <div id="main-container-header-instructions">
          <Link to="/mail">contact</Link>
        </div>
      </div>
      
      
          <div id="main-container-content" className="css-greydient main-content-fit">
          
        
        </div>
      <div id="main-container-footer">
        
      </div>
    </div>
  )
}

