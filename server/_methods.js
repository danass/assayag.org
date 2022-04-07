import { Twitterconf, mailconf, Telegramconf } from './conf.js';
import { TwitterCollection, RemindCollection } from '../assets/api/Collection.js';
import  { TwitterApi }  from 'twitter-api-v2';

Meteor.methods({
 async getTwitter(id) {


    const twitterClient = new TwitterApi({
        appKey: Twitterconf.CONSUMER_KEY,
        appSecret: Twitterconf.CONSUMER_SECRET,
        accessToken: Twitterconf.ACCESS_TOKEN_KEY,
        accessSecret: Twitterconf.ACCESS_TOKEN_SECRET
    });

    async function getDb(nbOfPages) {
      let allTweets = []
      const userTimeline = await twitterClient.v1.userTimeline('@danielassayag', { include_entities: true });
      let tweetPages = await userTimeline.fetchNext()
      return await userTimeline
  }

    async function getTweet(id) {
      let tweet = await twitterClient.v1.singleTweet(id);
      return tweet
    }

    if(id) {
      console.log("hey")
      return  await getTweet(id)
    }

    else {
    return getDb()
  }
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
    link: event.link,
    telegram: event.telegram,
    telegramSent: event.telegramSent
    }
    // update the database
    if(Meteor.userId() || Meteor.isServer) {
    await RemindCollection.update({_id: id}, {$set: currentEvent})
    }
    else {
      throw new Meteor.Error('not logged in')
    }
  },

async 'remind.remove'(id) {
  if(Meteor.userId() || Meteor.isServer) {
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
  if(Meteor.userId() || Meteor.isServer) {
  await RemindCollection.insert({name: "Event #", begin: new Date(Date.now()+ 1000*60*360), end: new Date(Date.now()+ 1000*60*360), description: "", link: "", remaining: "", status: "", telegram: false, telegramSent: false}, (e,r) => {
    return r
  })
    
}
  else {
    throw new Meteor.Error('unauthorized, you need to be logged in')
  }
  
},
 fetch(url, telegram) {
  // using child exec on local machine with wget

  return new Promise((resolve, reject) => {

    const exec = require("child_process").exec;
    exec(`wget -qO- ${url}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        console.log("fuck")
        return null
      }

      resolve(stdout);
      
    });
  }
  )
},

TelegramIt(message) {

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


})
