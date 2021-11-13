const puppeteer = require('puppeteer');

(async () => {

    const url = 'https://www.imdb.com';

   const browser = await  puppeteer.launch({
       headless: false,
        slowMo : 80,
        args : ['window-size=1920, 1080']
   });
   const page = await browser.newPage();


   // l'option waitUntil permet d'attendre que la requête aboutisse et retourne une résultat
   await page.goto(`${url}/title/tt2283336/?ref_=nv_sr_srsg_8`, {
       waitUntil : 'networkidle2'
   });

   const data = await page.evaluate(() => {
       return document.querySelector('div[class="title_wrapper"] > h1').innerText;

   });

   console.log(data);
   await browser.close();
})() ;