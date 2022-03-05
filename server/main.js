import { Meteor } from 'meteor/meteor';
import { TasksCollection, TwitterCollection} from '../imports/api/Collection.js';
import  './_methods.js';


const insertTask = (Collection, taskText) => {
  Collection.insert({ text: taskText, createdAt: new Date() });
}



Meteor.startup(async () => {

TwitterCollection.createIndex( { name: -1 } )

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
    "Faire l'amour",
    "Faire la vie",
].forEach(insertTask.bind(null, TasksCollection))
  }

});

