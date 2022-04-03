import { mailconf } from './conf.js';
import {TwitterCollection, RemindCollection } from '../assets/api/Collection.js';
const https = require('https');

Meteor.methods({
  async fetchTwitter() {
    const exec = require("child_process").exec;
    return new Promise((resolve, reject) => {
      let request = "wget -SO- https://rsshub.app/twitter/user/danielassayag/readable=1&authorNameBold=1&showAuthorInTitle=1&showAuthorInDesc=1&showQuotedAuthorAvatarInDesc=1&showAuthorAvatarInDesc=1&showEmojiForRetweetAndReply=1&showRetweetTextInTitle=0&addLinkForPics=1&showTimestampInDescription=1&showQuotedInTitle=1&heightOfPics=150 2>&1"

      // let request = "wget -SO- -T 1 -t 1 " + url + " 2>&1 >/dev/null"
      exec(request, (err, stdout, stderr) => {
        if (err) {
          console.log("fuck", stderr)
          reject(err);
          return null
        }
        console.log(stdout)
        resolve(stdout);
      });
    })

  },
  async mail(from, msg, accuse) {
    "use strict";
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      host: mailconf.thehost,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: mailconf.theuser,
        pass: mailconf.thepass,
      },
    });

    let info = await transporter.sendMail({
      from: from,
      to: [mailconf.theuser, accuse? from: null].filter(Boolean), // list of receivers
      subject: "assayag.org: " + from, // Subject line
      text: msg, 
      html: msg, 
    });

    console.log("Contact assayag.org: %s", info.messageId);
  },

  async getRandomTweet(useroptions, viewedIds, randomIndex, maxRand) {

    randomIndex = parseInt(randomIndex)
    useroptions['params'].maxRand = 0
    // let viewedIdsAll =  [...new Set(viewedIds.map(aid=> {
    //   return aid.id  }))]
     let currentOptions = []

    currentOptions.unshift(
      {    "$group": {
      "_id": "$id",
      "doc": {
        "$first": "$$ROOT"
      }
    }}, { "$replaceRoot": { "newRoot": "$doc" } }
    )
    let option = {}

    for (const [key, value] of Object.entries(useroptions)) {
      if(key != 'params') {
      // update useroptions with size of each collection source group 
      documentsCollection =  await TwitterCollection.rawCollection().aggregate([ { $match: { "source": { $in: useroptions[key].sources }}}]).toArray()
        useroptions[key].size = documentsCollection.length -1    
      if (!useroptions[key].clicked) { 
        option = { $match: { "source": { $nin: useroptions[key].sources }}}
        currentOptions.unshift(option)
      }
      if (useroptions[key].clicked) {
        // updating useroptions with maximum random value possible based on selected sources
        useroptions['params'].maxRand += useroptions[key].size 
      }
    }

  }
    // currentOptions.push({ $match: {  "_id": { $nin: viewedIdsAll.map(aid => Long(aid.toString())) }}})
    currentOptions.push(  { $skip: randomIndex } )
    // currentOptions.push(   { $sample: { size: 1 } } )
    currentOptions.push(  { $limit: parseInt(useroptions['params'].listSize) }  )

    
     try {
        let Data = await TwitterCollection.rawCollection().aggregate(currentOptions).toArray()
        return [[Data], useroptions['params'].maxRand, useroptions]
        
      } catch (e) {
        console.log(e)
        return [{text: "no data", id: 666, source:"walou"}]
      }
  },
  async removeTweet(arg) {
    try {

      let tweet = await TwitterCollection.rawCollection().aggregate(
        [{ $match: { "text": arg  }}]
        ).forEach(async function(doc) {
          let deleteTweet = await TwitterCollection.remove({ "_id": doc._id });
          console.log("deleted:", deleteTweet? true: false)
        })

      // console.log(arg)
    } catch (e) {
      console.log(e)
    }

  },
 async wget(url, method) {

 if(!url) {
  return null
 }
   const format = /[ `!@#$^*()+\-\[\]{};'"\\|,<>~]/;
  // test if url is a valid url
  let pass = false

  if (url.includes("|") || url.includes(";") ) {
    return "die"
  }
  if (url.match(/^(http|https):\/\/[^ "]+$/)) {
    pass = true
  }
  if (url.match(/[^a-zA-Z0-9-_./?=&]/)) {
    pass = true
  }
  else { pass = false }
  // check if url doesnt contain forbidden characters
  
    if(pass){
    const exec = require("child_process").exec;
    return new Promise((resolve, reject) => {
      let request = "wget -S --spider "+url+" 2>&1 | awk '/^  /'  |  awk -F  'Location: ' '{ print  $2 $3 $4 }' | awk NF | awk '{ if( NR==1 )  print $1 }'"
      if(method) {
      request = "wget -SO- -T 1 -t 1 " + url
      }

      // let request = "wget -SO- -T 1 -t 1 " + url + " 2>&1 >/dev/null"
      exec(request, (err, stdout, stderr) => {
        if (err) {
          console.log("fuck", stderr)
          reject(err);
          return null
        }
        resolve(stdout);
      });
    })
}
},

async 'remind.update'(id, event) {

  let currentEvent = {
    name: event.name,
    begin: event.begin,                    
    end: event.end,
    interval: event.interval,
    description: event.description,
    link: event.link
    }
    // update the database
    if(Meteor.userId()) {
    await RemindCollection.update({_id: id}, {$set: currentEvent})
    }
    else {
      throw new Meteor.Error('not logged in')
    }
  },

async 'remind.remove'(id) {
  if(Meteor.userId()) {
  return await RemindCollection.remove({_id: id})
  }
  else {
    throw new Meteor.Error('unauthorized, you need to be logged in')
  }
},

 async 'remind.find'() {
  let Data = await RemindCollection.rawCollection().aggregate([{ $limit: 10 } ]).toArray()
  return Data
},

async 'remind.new'() {
  // update the database
  if(Meteor.userId()) {
  await RemindCollection.insert({name: "Event #", begin: new Date(Date.now()), end: "", description: "", link: "", remaining: "", status: ""})
  }
  else {
    throw new Meteor.Error('unauthorized, you need to be logged in')
  }
  
},


})
