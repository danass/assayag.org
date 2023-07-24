import { Meteor } from 'meteor/meteor';
import { RemindCollection, UsersAppDB } from '../src/api/Collection.js';
import './_methods.js';
import {Telegramconf } from './conf.js';



Meteor.setInterval(async () => {
    await Meteor.call('remind.find', "admin4 5(R+Dvfg44rfZEFEZ11111é $$$D cC(5555", (err, res) => {
        if (err) {
            console.log(err)
        }
        else {
            res.forEach(event => {
                triggerTelegram(event)
            })
        }
    })
 
}, 5000);

function toNow(date) {
    let diff = Date.now() - new Date(date)
    return diff
}
function TelegramIt(message) {
    return new Promise((resolve, reject) => {
        console.log("wesh")
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

  async function updateEvent(event, change) {
      await Meteor.call('remind.update', event, change, "admin4 5(R+Dvfg44rfZEFEZ11111é $$$D cC(5555") 
    }

function triggerTelegram(event) {
    console.log(event)
    if(event.telegram) {
    let restant = toNow(event.end) // time in ms
    if (restant < 0) { 
        restant = Math.abs(restant)
        console.log(restant, (1000 *  1).toString(), (1000 *  10))
        let ten_ago = restant > (1000 * 1) && restant < (1000 * 10)
        
        if (!event.telegramSent) {
            if (ten_ago) {
                console.log("done")
                TelegramIt(event.name)
                updateEvent(event, { telegramSent: true })
                Meteor.setTimeout(() => {
                    updateEvent(event, { telegramSent: false });
                }, 1000 *  5);
            }
        }

    }

    }
}