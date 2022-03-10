import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Global } from './Modules'

export const App = () => {
  const globalState = Global({pageName: "Home"})
  return (
    
    <div id="home">
      <h1>{globalState.title}</h1>
      <div><h3>assayag.org</h3></div>
      <div> <Link to="/mail">contact</Link></div>
    </div>
  )
}

