import React from 'react';
import { Link } from 'react-router-dom';
import { Global } from './Modules'

export const App = () => {

  const globalState = Global({pageName: "Home"})

  return (
    
    <div id="main-container">
      
      <div id="main-container-header">
        <div id="main-container-header-title">
          Home
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

