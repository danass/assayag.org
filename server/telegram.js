import { Meteor } from 'meteor/meteor';
import { RemindCollection } from '../src/api/Collection.js';
import './_methods.js';
import {Telegramconf } from './conf.js';


Meteor.setInterval(async () => {
    let remindData = RemindCollection.find({}).fetch()
    remindData.map(event => {
        triggerTelegram(event)
    })
}, 5000);

function toNow(date) {
    let diff = Date.now() - new Date(date)
    return diff
}
function TelegramIt(message) {
    return new Promise((resolve, reject) => {
      let url = `https://api.telegram.org/${Telegramconf.botkey}/sendMessage?chat_id=${Telegramconf.channelid}&text=${message}`
      console.log(url)
      const exec = require("child_process").exec;
      exec(`wget -qO- "${url}"`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
          console.log("fuck")
          return null
        }
        else {
          console.log(stdout  )
        }
        resolve(stdout);
      });
    }
    )
    
  }

  async function updateEvent(id, event) {

    let currentEvent = {
      name: event.name,
      begin: event.begin,                    
      end: event.end,
      interval: event.interval,
      description: event.description,
      link: event.link,
      telegram: event.telegram,
      telegramSent: event.telegramSent,
      private: event.private
      }
      // update the database
      await RemindCollection.update({_id: id}, {$set: currentEvent})
    }


function triggerTelegram(event) {

    if(event.telegram) {
    let restant = toNow(event.end) // time in ms
    
    if (restant < 0) { 
        restant = Math.abs(restant)

        let ten_ago = restant > (1000 * 60 * 9) && restant < (1000 * 60 * 10)
        if (!event.telegramSent) {
            if (ten_ago) {
                TelegramIt(event.name)
                updateEvent(event._id, { telegramSent: true })
                Meteor.setTimeout(() => {
                    updateEvent(event._id, { telegram: false, telegramSent: false });
                }, 1000 * 60 * 1);
            }
        }

    }

    }
}