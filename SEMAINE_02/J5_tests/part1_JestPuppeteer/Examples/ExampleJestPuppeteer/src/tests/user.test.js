const puppeteer = require('puppeteer');

const timeout = 1000;

test('test Name Alan', async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('file:///Users/antoine/Desktop/Perso/CoursGit/React/semaine1_2_3_fondamentaux/part6_avancees/part3_tests/part1/Examples/ExampleJestPuppeteer/src/index.html');

    const name = await page.$eval('.user', el => el.textContent);
    expect(name).toBe('Alan 48 years');

    await browser.close();
}, timeout);