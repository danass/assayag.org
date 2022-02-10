import React from 'react';
import { Meteor } from 'meteor/meteor';
import  {render} from 'react-dom';
import { App } from '/imports/ui/App';
import { Menu } from '/imports/ui/Menu';
import { Rain } from '/imports/ui/Rain';
import { TaskList } from '../imports/ui/TaskRender';
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
      <Route path="/rain" element={<Rain />} />
      <Route path="/fronteras" element={<Maritime />} />
      <Route path="/" element={<App />} />
      <Route path="/tasks" element={<TaskList />} />
    </Routes>
    </BrowserRouter>
    </div>, 
    rootElement
  
  ) 

  render(
    <Menu />,
    document.getElementById('react-menu')
  )
});

