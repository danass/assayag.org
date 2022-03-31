import { Meteor } from 'meteor/meteor';
import { TasksCollection, RemindCollection } from '../assets/api/Collection.js';
import  './_methods.js';

const insertTask = (Collection, taskText) => {
  Collection.insert({ text: taskText, createdAt: new Date() });
}

Meteor.startup(async () => {
  Meteor.publish('remind', async function () {
    return await RemindCollection.find({});
  });

  if(TasksCollection.find().count() === 0) {
   ["Faire l'examen",
    "Faire l'amour",
    "Faire la vie",
].forEach(insertTask.bind(null, TasksCollection))
  }

});

