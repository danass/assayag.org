import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render';
import { RemindCollection } from '../src/api/Collection.js';

import  './_methods.js';
import './telegram.js'  

import App from "../src/ui/App.jsx";

onPageLoad(sink => {

  let path = sink.request.url.pathname;
  const routes = App().props.children.props.children.map(route => route.props.path)
  if (!path.endsWith('/')) { path = path + '/' }
  if (!routes.includes(path)) {
    sink.setStatusCode(404);
  }

})

Meteor.startup(async () => {
  Meteor.publish('remind', async function () {
    return await RemindCollection.find({});
  });

});

