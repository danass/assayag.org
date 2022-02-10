import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/Collection.js';
const puppeteer = require('puppeteer');


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


Meteor.methods({
  async maritime() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/maroc/');
      const data = await page.evaluate((e) => {
        function getMaritime() {
          let data = [];
          document
            .getElementById("derniere_nopush")
            .querySelectorAll("strong")
            .forEach((s) => {
                  data.push(s)
            })
             return data.filter((d) => {
              return d.innerHTML.includes("maritimes") == true   
            })[0].parentNode.innerText
          }
         return {
           date: document.getElementsByClassName('date_derniere_minute')[0].children[0].children[0].innerHTML,
           maritime: getMaritime()
         }
        });
      await browser.close();
      return data;
  }
})
    