import { Meteor } from 'meteor/meteor';
import { RemindCollection } from '../assets/api/Collection.js';
import  './_methods.js';



Meteor.startup(async () => {
  Meteor.publish('remind', async function () {
    return await RemindCollection.find({});
  });


const SEED_USERNAME = 'daniel';
const SEED_PASSWORD = 'temp';

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

});


// const insertTask = (Collection, taskText) => {
//   Collection.insert({ text: taskText, createdAt: new Date() });
// }
// if(TasksCollection.find().count() === 0) {
// ["Faire l'examen",
// "Faire l'amour",
// "Faire la vie",
// ].forEach(insertTask.bind(null, TasksCollection))