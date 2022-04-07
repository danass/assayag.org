import { Meteor } from 'meteor/meteor';
import { RemindCollection } from '../assets/api/Collection.js';
import './_methods.js';



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

function triggerTelegram(event) {
    if(event.telegram) {
    let restant = toNow(event.end) // time in ms
    
    if (restant < 0) { 
        restant = Math.abs(restant)

        let ten_ago = restant > (1000 * 60 * 9) && restant < (1000 * 60 * 10)
        if (!event.telegramSent) {
            if (ten_ago) {
                Meteor.call('TelegramIt', event.name)
                Meteor.call('remind.update.server', event._id, { telegramSent: true })
                Meteor.setTimeout(() => {
                    Meteor.call('remind.update.server', event._id, { telegram: false, telegramSent: false });
                }, 1000 * 60 * 1);
            }
        }

    }

    }
}