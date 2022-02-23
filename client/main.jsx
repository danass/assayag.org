import React from 'react';
import { Meteor } from 'meteor/meteor';
import  {render} from 'react-dom';
import { App } from '/imports/ui/App';
import { Menu } from '/imports/ui/Menu';
import { Rain } from '/imports/ui/Rain';
import { TaskList } from '../imports/ui/TaskRender';
import { Tiktok, Mail } from '../imports/ui/Modules';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Maritime } from '../imports/ui/Maritime';

rootElement = document.getElementById('react-target');

Meteor.startup(() => {
  
  render(
    <div>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div><Menu /><App /></div>} />
      <Route path="/rain" element={<div><Menu /><Rain /></div>} />
      <Route path="/fronteras" element={<div><Menu /><Maritime /></div>} />
      <Route path="/tasks" element={<div><Menu /><TaskList /></div>} />
      <Route path="/tiktok" element={<div><Menu /><Tiktok /></div>} />
      <Route path="/mail" element={<div><Menu /><Mail /></div>} />
    </Routes>
    </BrowserRouter>
    </div>, 
    rootElement
  
  ) 

  
});

