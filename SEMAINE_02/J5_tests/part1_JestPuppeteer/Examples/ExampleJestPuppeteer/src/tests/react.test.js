const puppeteer = require('puppeteer');

const timeout = 3000;

test('contenu dans une classe particulière', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://fr.reactjs.org/');
    const content = await page.$eval('.css-1s44ra', e => e.innerHTML);
    expect(content).toBe("Une bibliothèque JavaScript pour créer des interfaces utilisateurs");
    await browser.close();
}, timeout);
