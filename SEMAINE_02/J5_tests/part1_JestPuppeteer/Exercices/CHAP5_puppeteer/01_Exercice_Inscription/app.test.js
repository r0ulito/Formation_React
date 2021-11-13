const puppeteer = require('puppeteer');
const timeout = 60000;

const URL = 'file:///Users/antoine/Desktop/Perso/CoursGit/React/semaine1_2_3_fondamentaux/part6_avancees/part3_tests/part1_JestPuppeteer/Exercices/Inscription/index.html';

const browserConfig = {
  headless: false,
  slowMo: 80,
  args: ['window-size=1920, 1080']
};

let page;

beforeEach(async () => {
  // Get a new page for each test so that we start fresh.
  page = await browser.newPage()
})

afterEach(async () => {
  await page.close()
})

describe("Test formulaire d'inscription", () => {

  test('Check last user', async () => {
    const browser = await puppeteer.launch();
    //const page = await browser.newPage();
    await page.goto(URL);

    await page.click('input#name');
    await page.type('input#name', 'John');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#add');

    const lastUser = await page.$eval('.last-user', el => el.textContent);
    expect(lastUser).toBe('John age : 28');

    await browser.close();
  });

  test('Add new user', async () => {
    const browser = await puppeteer.launch(browserConfig);
    const pageHeadless = await browser.newPage();
    await pageHeadless.goto(URL);

    const nbUserBeforeAdd = await pageHeadless.evaluate(async () => {
      const el = document.querySelectorAll('.users > li.item');

      return el.length || 0;
    });

    // Ajouter un nouvel utilisateur
    await pageHeadless.click('input#name');
    await pageHeadless.type('input#name', 'Phil');
    await pageHeadless.click('input#age');
    await pageHeadless.type('input#age', '28');
    await pageHeadless.click('#add');

    const listUsers = await pageHeadless.evaluate(async () => {
      const el = document.querySelectorAll('.users > li.item');

      return { user: el[3].textContent, nb: el.length || 0 };
    });

    expect(listUsers.user).toBe('Phil age : 28');
    expect(listUsers.nb).toBe(nbUserBeforeAdd + 1);

    await browser.close();

  }, timeout);

  test("Error empty field 1/3", async () => {
    const browser = await puppeteer.launch();
    //const page = await browser.newPage();
    await page.goto(URL);

    await page.click('#add');
    const finalText = await page.$eval('.error', el => el.textContent);
    expect(finalText).toBe('La saisie comporte une erreur');

    await browser.close();
  }, timeout);

  test("Error empty field 2/3", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    await page.type('input#name', 'Anna');
    await page.click('#add');
    const finalText = await page.$eval('.error', el => el.textContent);
    expect(finalText).toBe('La saisie comporte une erreur');

    await browser.close();
  }, timeout);

  test("Error empty field 3/3", async () => {
    const browser = await puppeteer.launch();
   // const page = await browser.newPage();
    await page.goto(URL);
    await page.type('input#age', "48");
    await page.click('#add');
    const finalText = await page.$eval('.error', el => el.textContent);
    expect(finalText).toBe('La saisie comporte une erreur');

   await browser.close();
  }, timeout);

  test("Error same user", async () => {
    const browser = await puppeteer.launch();
   // const page = await browser.newPage();
    await page.goto(URL);
    await page.type('input#age', "48");
    await page.type('input#name', 'Anna');
    await page.click('#add');

    await page.type('input#age', "48");
    await page.type('input#name', 'Anna');
    await page.click('#add');

    expect(1).toBe(1);

    const finalText = await page.$eval('.error', el => el.textContent);
    expect(finalText).toBe("Attention l'utilisateur Anna existe déjà");

   await browser.close();
  }, timeout);

})