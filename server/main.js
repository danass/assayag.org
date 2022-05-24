import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render';
import { WebActivity, RemindCollection } from '../src/api/Collection.js';
import React from 'react';

import  './_methods.js';
import './telegram.js'  

import App from "../src/ui/App.jsx";

onPageLoad( (sink) => {
  let path = sink.request.url.pathname;
  const routes = App().props.children.props.children.map(route => route.props.path)
  if (!path.endsWith('/')) { path = path + '/' }
  if (!routes.includes(path)) { sink.setStatusCode(404); }

  if (path == '/api' || path == '/api/') {
    let query = sink.request.url.query;

    if (query.url) {
    WebActivity.insert({
      url: query.url,
      ip: sink.request.connection,
      date: new Date()
    })
  }
  
    
  }
})

Meteor.startup(async () => {
  Meteor.publish('remind', async function () {
    return await RemindCollection.find({});
  });

  Meteor.publish('webactivity', async function () {
    let data =  await WebActivity.find({})
    return data;
    });
   
  // Trim webactivity array, remove old entries that are older than 16 hours using the date field
  WebActivity.rawCollection().createIndex({ date: 1 }, { expireAfterSeconds: 86400 });



});

