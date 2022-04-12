import { Meteor } from 'meteor/meteor';
import { RemindCollection, UsersAppDB } from '../src/api/Collection.js';
import  './_methods.js';

import './telegram.js'

Meteor.startup(async () => {
  Meteor.publish('remind', async function () {
    return await RemindCollection.find({});
  });

});


// const insertTask = (Collection, taskText) => {
//   Collection.insert({ text: taskText, createdAt: new Date() });
// }
// if(TasksCollection.find().count() === 0) {
// ["Faire l'examen",
// "Faire l'amour",
// "Faire la vie",
// ].forEach(insertTask.bind(null, TasksCollection))