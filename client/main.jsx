import React from 'react';
import { Meteor } from 'meteor/meteor';
import  {render} from 'react-dom';
import { App } from '/assets/ui/App';
import { Menu } from '/assets/ui/Menu';
import { Rain }  from '/assets/ui/Rain';
import { Asocial } from '../assets/ui/Asocial';
import { Mail } from '../assets/ui/Modules';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const rootElement = document.getElementById('react-target');


  render(
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<div ><Menu /><App /></div>} />
      <Route path="/rain" element={<div><Menu /><Rain /></div>} />
      <Route path="/asocial"  element={<div><Menu /><Asocial /></div>} />
      <Route path="/mail"  element={<div><Menu /><Mail /></div>} />
      <Route path="/asocial/tiktok/:id" element={<div><Menu /><Asocial /></div>} /> 
      <Route path='*' element={<div><Menu /><h1>Walou 404</h1></div>}/>
    </Routes>
    </BrowserRouter>, 
    rootElement
  ) 

Meteor.startup(() => {
  // code to run on server at startup
}
);

