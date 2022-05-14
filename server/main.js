import { Meteor } from 'meteor/meteor';
import { RemindCollection, UsersAppDB } from '../src/api/Collection.js';
import  './_methods.js';

import './telegram.js'

Meteor.startup(async () => {
  Meteor.publish('remind', async function () {
    return await RemindCollection.find({});
  });

});