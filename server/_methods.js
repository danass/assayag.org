import { mailconf } from './conf.js';
import {TwitterCollection } from '../imports/api/Collection.js';
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

  async getRandomTweet(useroptions, viewedIds) {
     let currentOptions = [ { $sample: { size: 1 } } ]
     currentOptions.unshift({ $match: { "id": { $nin: viewedIds }}})

    if (!useroptions.twitter) { 
      currentOptions.unshift({ $match: { "source": { $nin: [ "https://dev.twitter.com/docs/tfw", "http://twitter.com/download/android", "http://twitter.com", "http://twitter.com/download/iphone", "https://mobile.twitter.com"  ] }}})

    } 
    if (!useroptions.tumblr) { 
      currentOptions.unshift({ $match: { "source": { $ne :  "https://www.tumblr.com/"  }}}) 
    } 
     
    if(!useroptions.assayag) {
      currentOptions.unshift({ $match: { "source": { $ne :  "https://www.assayag.org"  }}}) 
    }

    if(!useroptions.google) {0
      currentOptions.unshift({ $match: { "source": { $ne :  "https://www.google.com/"  }}}) 
    }
    if(!useroptions.instagram) {
      currentOptions.unshift({ $match: { "source": { $ne :  "http://instagram.com"  }}})
    }
    
     try {
        let Data = await TwitterCollection.rawCollection().aggregate(currentOptions).toArray()
        let stats = await TwitterCollection.rawCollection().stats()
        // console.log(stats.count, Data.length )
        return Data
      } catch (e) {
        console.log(e)
        return [{text: "no data", id: {high: 2, low: 3}, source:"walou"}]
      }
  }
});

  //  currentOptions.push({ "$match": { "media": { "$exists": true } } })
        // { $match: { "source": "https://www.assayag.org"  }}, 
        // { $match: {'media': { $exists: true }}},
        // { "$match": { "media": { "$exists": true } } },
        
        // { $match: { "source": { $ne : "https://mobile.twitter.com"  }}}, 
        
        
        // $match: {
        //   source: "https://www.assayag.org"
        // }, 