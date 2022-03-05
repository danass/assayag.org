import React from 'react';
export const App = () => {
import { Link } from 'react-router-dom';

  return (
    <div id="home">
      <div><h3>assayag.org</h3></div> 
      <div> <Link to="/mail">contact</Link></div>
    </div>
  )
}

