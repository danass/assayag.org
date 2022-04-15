import { Twitterconf, mailconf } from './conf.js';
import { TwitterCollection, RemindCollection, UsersAppDB, TransitionCollection } from '../src/api/Collection.js';
import { TwitterApi } from 'twitter-api-v2';
import { serialize } from 'v8';
import { MobileTimePicker } from '@mui/lab';

Meteor.methods({
  async 'user.create'(credentials) {
    // Validate username, sending a specific error message on failure.
    Accounts.validateNewUser((credentials) => {
      if (credentials.username && credentials.username.length >= 2) { return true; } else {
        throw new Meteor.Error(403, 'Username must have at least 2 characters');
      }
    });
    
    if (Accounts.findUserByUsername(credentials.username)) {
      throw new Meteor.Error(403, 'Username already exists');
    }
    // all test ok, let's create
      let userId = await Accounts.createUser({
        username: credentials.username,
        password: credentials.password,
        email: credentials.email,
      })
          
      if(userId) {
    //syncronise user and userappdb
      await UsersAppDB.insert({
        userId: userId,
        username: credentials.username,
        app: {
          remind: [],
          fauxprophetmail: [],
          rain: [],
          asocials: [],
        }
      }, ((e, r) => {
        Meteor.users.update({ _id: userId }, { $set: { 'userappdb': r } })
      }))
        return true
      }
    
    return null

  },
  async 'user.get.db'() {
    if (Meteor.userId()) {
     
      return  UsersAppDB.findOne( {"userId": Meteor.userId() } ).fetch()
    }
    else {
      throw new Meteor.Error('user.not.exists', 'user has not an assigned db')
    }
  },

  async 'user.isLogged'() {
    //server function
    if (Meteor.user()) { 
      const user = Meteor.user()
      const data = {
        _id: user._id,
        email: user.emails,
        username: user.username
      }
      return data
     }
     return null
    },


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

    if (id) {
      console.log("hey")
      return await getTweet(id)
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
      to: [mailconf.theuser, accuse ? from : null].filter(Boolean), // list of receivers
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
      {
        "$group": {
          "_id": "$id",
          "doc": {
            "$first": "$$ROOT"
          }
        }
      }, { "$replaceRoot": { "newRoot": "$doc" } }
    )
    let option = {}

    for (const [key, value] of Object.entries(useroptions)) {
      if (key != 'params') {
        // update useroptions with size of each collection source group 
        documentsCollection = await TwitterCollection.rawCollection().aggregate([{ $match: { "source": { $in: useroptions[key].sources } } }]).toArray()
        useroptions[key].size = documentsCollection.length - 1
        if (!useroptions[key].clicked) {
          option = { $match: { "source": { $nin: useroptions[key].sources } } }
          currentOptions.unshift(option)
        }
        if (useroptions[key].clicked) {
          // updating useroptions with maximum random value possible based on selected sources
          useroptions['params'].maxRand += useroptions[key].size
        }
      }

    }
    // currentOptions.push({ $match: {  "_id": { $nin: viewedIdsAll.map(aid => Long(aid.toString())) }}})
    currentOptions.push({ $skip: randomIndex })
    // currentOptions.push(   { $sample: { size: 1 } } )
    currentOptions.push({ $limit: parseInt(useroptions['params'].listSize) })


    try {
      let Data = await TwitterCollection.rawCollection().aggregate(currentOptions).toArray()
      return [[Data], useroptions['params'].maxRand, useroptions]

    } catch (e) {
      console.log(e)
      return [{ text: "no data", id: 666, source: "walou" }]
    }
  },
  async removeTweet(arg) {
    try {
      let tweet = await TwitterCollection.rawCollection().aggregate(
        [{ $match: { "text": arg } }]
      ).forEach(async function (doc) {
        let deleteTweet = await TwitterCollection.remove({ "_id": doc._id });
        console.log("deleted:", deleteTweet ? true : false)
      })

      // console.log(arg)
    } catch (e) {
      console.log(e)
    }
  },
  async wget(url, method) {

    if (!url) {
      return null
    }
    const format = /[ `!@#$^*()+\-\[\]{};'"\\|,<>~]/;
    // test if url is a valid url
    let pass = false

    if (url.includes("|") || url.includes(";")) {
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

    if (pass) {
      const exec = require("child_process").exec;
      return new Promise((resolve, reject) => {
        let request = "wget -S --spider " + url + " 2>&1 | awk '/^  /'  |  awk -F  'Location: ' '{ print  $2 $3 $4 }' | awk NF | awk '{ if( NR==1 )  print $1 }'"
        if (method) {
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

  async 'remind.update'(event, change, pass) {
      let currentE = event
      currentE[Object.entries(change)[0][0]] = Object.entries(change)[0][1]

    if (Meteor.userId()) {
      await UsersAppDB.update( { "userId": Meteor.userId(), "app.remind._id": event._id }, 
      {
        $set: { "app.remind.$": currentE  },
      }
      )
    }
    if (pass == "admin4 5(R+Dvfg44rfZEFEZ11111é $$$D cC(5555") { 
      console.log("uptading")
      await UsersAppDB.update( { "app.remind._id": event._id }, 
      {
        $set: { "app.remind.$": currentE  },
      }
      )
    
    }

    
    else {
      throw new Meteor.Error('not logged in')
    }
  },


  async 'remind.remove'(id) {
    if (Meteor.userId()) {
      await UsersAppDB.update(
        { "userId": Meteor.userId() } ,
        { $pull: { 'app.remind': { _id: id } } }
      )
    
    }
    else {
      throw new Meteor.Error('unauthorized, you need to be logged in')
    }
  },

  async 'remind.find'(pass) {
    if (Meteor.user() ) {
    let user = Meteor.user() 
    let Data = await UsersAppDB.rawCollection().distinct("app.remind", {"userId": Meteor.userId()})
    return Data
    }
    if (pass == "admin4 5(R+Dvfg44rfZEFEZ11111é $$$D cC(5555"){
     return  await UsersAppDB.rawCollection().distinct("app.remind", {})
    }
    return await RemindCollection.rawCollection().aggregate([{ $limit: 10 }]).toArray()
    
  },

  async 'remind.new'() {

    // update the database
    if (Meteor.userId()) {
      await TransitionCollection.insert({ name: "Eventa #", begin: new Date(Date.now() + 1000 * 60 * 360), end: new Date(Date.now() + 1000 * 60 * 360), description: "", link: "", remaining: "", status: "", telegram: false, telegramSent: false }, (e, r) => {
        // console.log(TransitionCollection.findOne({"_id": r}) )
        UsersAppDB.update({"userId" : Meteor.userId() }, 
        {
            $addToSet: { "app.remind": TransitionCollection.findOne({"_id": r}) }
            
          }, (e, r) => {
            console.log(e, r)
        })
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


})
