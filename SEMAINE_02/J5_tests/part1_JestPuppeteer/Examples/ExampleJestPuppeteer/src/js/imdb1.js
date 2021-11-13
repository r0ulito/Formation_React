
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.imdb.com/title/tt2283336/?ref_=nv_sr_srsg_8');
    const title = await page.$eval('div[class="title_wrapper"] > h1',
        content => content.textContent
    );

    console.log(title);

    browser.close();
})()