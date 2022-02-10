import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/Collection.js';
import  './_methods.js';

const insertTask = (taskText) => {
  TasksCollection.insert({ text: taskText, createdAt: new Date() });
}

Meteor.startup(() => {
  if(TasksCollection.find().count() === 0) {
   ['Laver les chiottes',
    'Faire les courses',
   'Laver le frigo',
   'Se brosser les dents',
   'Manger du pain',
    'Faire du sport',
    'Faire la vaisselle',
    'Faire du shopping',
    'Voler à la plage',
    'Signer le contrat de travail',
    'Organiser les vacances',
    'Laver le salon',
    'Balayer les plantes',
    'Oculter les chats',
    "Faire l'examen",
    "Faire l'amour"
].forEach(insertTask)
  }
  console.log("salam", TasksCollection.find().count());
});