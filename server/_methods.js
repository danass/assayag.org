import { mailconf } from './conf.js';

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
  // async mail(from, msg, accuse) {
  //   "use strict";
  //   const nodemailer = require("nodemailer");

  //   let transporter = nodemailer.createTransport({
  //     host: mailconf.thehost,
  //     port: 465,
  //     secure: true, // true for 465, false for other ports
  //     auth: {
  //       user: mailconf.theuser,
  //       pass: mailconf.thepass,
  //     },
  //   });

  //   let info = await transporter.sendMail({
  //     from: from,
  //     to: [mailconf.theuser, accuse? from: null].filter(Boolean), // list of receivers
  //     subject: "assayag.org: " + from, // Subject line
  //     text: msg, 
  //     html: msg, 
  //   });

  //   console.log("Contact assayag.org: %s", info.messageId);
  // },
});
