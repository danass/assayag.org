import React from 'react';
import { Meteor } from 'meteor/meteor';
import  {render} from 'react-dom';
import { App } from '/imports/ui/App';
import { Menu } from '/imports/ui/Menu';
import { Rain }  from '/imports/ui/Rain';
import { Asocial } from '../imports/ui/Asocial';
import { Mail } from '../imports/ui/Modules';
import { TaskList } from '../imports/ui/TaskRender';

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
      <Route path="/" element={<div><Menu /><App /></div>} />
      <Route path="/rain" element={<div><Menu /><Rain /></div>} />
      <Route path="/tasks" element={<div><Menu /><TaskList /></div>} />
      <Route path="/asocial" element={<div><Menu /><Asocial /></div>} />
      <Route path="/mail" element={<div><Menu /><Mail /></div>} />
      {/* <Route path="/robots.txt" element={"salut"} /> */}
    </Routes>
    </BrowserRouter>
    
, 
    rootElement
  ) 

  

  
});

