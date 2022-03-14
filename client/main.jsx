import React from 'react';
import { Meteor } from 'meteor/meteor';
import  {render} from 'react-dom';
import { App } from '/imports/ui/App';
import { Menu } from '/imports/ui/Menu';
import { Rain }  from '/imports/ui/Rain';
import { Asocial } from '../imports/ui/Asocial';
import { Mail } from '../imports/ui/Modules';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// serving robots.txt

rootElement = document.getElementById('react-target');

Meteor.startup(() => {

  render(
    <BrowserRouter>
    <Routes>
      <Route path="/" index  element={<div><Menu /><App /></div>} />
      <Route path="/rain" element={<div><Menu /><Rain /></div>} />
      <Route path="/asocial"  element={<div><Menu /><Asocial /></div>} />
      <Route path="/mail"  element={<div><Menu /><Mail /></div>} />
      <Route path='*' element={<div>walou 404</div>} />
    </Routes>
    </BrowserRouter>
    
, 
    rootElement
  ) 
});

