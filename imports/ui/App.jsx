import React from 'react';
import { Link } from 'react-router-dom';

export const App = () => {
  return (
    <div id="home">
      <div><h3>assayag.org</h3></div> 
      <div> <Link to="/mail">contact</Link></div>
    </div>
  )
}

