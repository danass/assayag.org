Meteor.methods({
  async maritime() {
    const puppeteer = require('puppeteer');
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
  },
})




