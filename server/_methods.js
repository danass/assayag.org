import { mailconf } from './conf.js';
import {TwitterCollection } from '../imports/api/Collection.js';
// var Long = require("mongodb").Long;

Meteor.methods({
  // async maritime() {
  //   const puppeteer = require("puppeteer");
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(
  //     "https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/maroc/"
  //   );
  //   const data = await page.evaluate((e) => {

  //     function getMaritime() {
  //       let data = [];
  //       document
  //         .getElementById("derniere_nopush")
  //         .querySelectorAll("strong")
  //         .forEach((s) => {
  //           data.push(s);
  //         });
  //       return data.filter((d) => {
  //         return d.innerHTML.includes("maritimes") == true;
  //       })[0].parentNode.innerText;
  //     }

  //     function getTerrestre() {
  //       let data = [];
  //       document
  //         .getElementById("derniere_nopush")
  //         .querySelectorAll("strong")
  //         .forEach((s) => {
  //           data.push(s);
  //         });
  //       return data.filter((d) => {
  //         return d.innerHTML.includes("frontières terrestres") == true;
  //       })[0].parentNode.innerText;
  //     }

  //     return {
  //       date: document.getElementsByClassName("date_derniere_minute")[0]
  //         .children[0].children[0].innerHTML,
  //       maritime: getMaritime(),
  //       terrestre: getTerrestre(),
  //     };
  //   });
  //   await browser.close();
  //   return data;
  // },



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
    useroptions['insta'].maxRand = 0
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
      // update useroptions with size of each collection source group 
      getSize =  await TwitterCollection.rawCollection().aggregate([ { $match: { "source": { $in: useroptions[key].sources }}}]).toArray()
        useroptions[key].size = getSize.length        
      if (!useroptions[key].clicked) { 
        option = { $match: { "source": { $nin: useroptions[key].sources }}}
        currentOptions.unshift(option)
      }
      if (useroptions[key].clicked) {
        // updating useroptions with maximum random value possible based on selected sources
        useroptions['insta'].maxRand += useroptions[key].size 
      }
    }

    // currentOptions.push({ $match: {  "_id": { $nin: viewedIdsAll.map(aid => Long(aid.toString())) }}})
    currentOptions.push(  { $skip: randomIndex } )
    // currentOptions.push(   { $sample: { size: 1 } } )
    currentOptions.push(  { $limit: 1 } )
    
     try {
        let Data = await TwitterCollection.rawCollection().aggregate(currentOptions).toArray()
        return [[Data[0]], useroptions['insta'].maxRand, useroptions]
        
      } catch (e) {
        console.log(e)
        return [{text: "no data", id: 666, source:"walou"}]
      }
  },


 async wget(url) {

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
      // let request = "wget -SO- -T 1 -t 1 " + url + " 2>&1 >/dev/null"
      exec(request, (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return "no webssite"
        }
        resolve(stdout);

      });
    })
}
}
})

  //  currentOptions.push({ "$match": { "media": { "$exists": true } } })
        // { $match: { "source": "https://www.assayag.org"  }}, 
        // { $match: {'media': { $exists: true }}},
        // { "$match": { "media": { "$exists": true } } },
        
        // { $match: { "source": { $ne : "https://mobile.twitter.com"  }}}, 
        
        
        // $match: {
        //   source: "https://www.assayag.org"
        // }, 