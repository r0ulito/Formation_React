# Introduction à Puppeteer

Puppeteer est une bibliothèque Node.js développée par Google, permettant de contrôler un navigateur Chromium. Vous pouvez l'utiliser en mode **headless** sans interface c'est-à-dire sans navigateur Web ou avec Chromium.

Nous testerons ici le **comportement** de notre application. Bien sûr tester le comportement implique également les tests unitaires que nous avons déjà abordés.

## Test bout à bout ou End to End en Anglais

Le module puppeteer nous permettra avec Jest de faire ce que l'on appelle des tests bout à bout. On pourra tester le comportement d'une partie ou de l'ensemble des parties d'une application Web. Dans le cas d'une boutique en ligne par exemple, nous pourrions tester le comportement d'un client de cette boutique pour savoir si l'application que nous livrons est conforme à ce qui a été demandé dans le cahier des charges. On pourra ainsi tester que le client peut effectuer correctement sa commande. Ce type de tests bout à bout est appelé test horizontal. Les tests bout à bout verticaux testeront pour leur part des comportements techniques de l'application qui ne nécessitent pas d'interface utilisateur : interface de programmation API, interface SQL, ...

## Installation et configuration

Créez un dossier **ExampleJestPuppeteer** dans le dossier Examples.

Lancez la commande suivante pour initialiser le projet :

```bash
npm init
```

Puis installez les modules suivants pour faire les tests avec Jest et Puppeteer

```bash
npm install puppeteer jest --save-dev
```

Créez les fichiers suivants :

1. Configuration de Jest

Créez le fichier jest.config.js :

```js

module.exports = {
    preset : "jest-puppeteer", // module passerel jets/puppeter
    testMatch : [
        "**/test/**/*.test.js" // précise les dossiers de tests
    ],
    verbose : true
}
```

2. Dans le fichier package.json

Indiquez simplement dans ce fichier que vous utiliserez jest pour les tests :

```json
{
    "scripts" : {
        "test" : "jest"
    }
}
```

## Utilisation de Puppeteer

Nous allons dans un premier temps utiliser Puppeteer seul. Dans l'exemple qui suit nous récupérons un contenu dans une page, en l'occurence le titre d'un film.

Notons que nous ne lancerons pas de navigateur, en effet le mode est par défaut en headless à true (sans interface).

Dans le dossier src créez un dossier js et le fichier  suivant et lancez l'exécution de Puppeteer à l'aide de NodeJS comme suit :

```bash
node index.example1.js
```

Contenu du fichier imdb1.js : 

```js

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

```

Dans l'exemple qui suit nous allons lancer une interface utilisateur : Chromium.

Code du fichier imdb2.js :

```js

const puppeteer = require('puppeteer');

(async () => {

    const url = 'https://www.imdb.com';

   const browser = await  puppeteer.launch({
        headless: false, // lancement de l'interface Chromium
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

```

## Jest et Puppeteer

Nous allons montrer maintenant comment tester la présence d'un contenu, en l'occurence un titre particulier dans une page Web. Il faut donc maintenant utiliser Jest et Puppeteer. Toujours dans le dossier ExampleJestPuppeteer créez le fichier suivant dans le dossier tests du dossier src. La configuration de Jest et Puppeteer devrait permettre de lancez le test à l'aide de la commande suivante :

```bash
npm run test
```

Contenu du fichier user.test.js. La constante timeout assure que nous aurons suffisament de temps pour réaliser l'exploration de la page et faire le test. Toutes les méthodes de tests sont faites à l'aide de fonction async/await intégrées dans le module Jest :

```js
const puppeteer = require('puppeteer');

// par défaut 5000
const timeout = 10000;

test('contenu dans une classe particulière', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://fr.reactjs.org/');
    const content = await page.$eval('.css-1s44ra', e => e.innerHTML);
    expect(content).toBe("Une bibliothèque JavaScript pour créer des interfaces utilisateurs");
    await browser.close();

}, timeout);

```

Créez la page index.html suivante à la racine du dossier src :

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Jest and Puppeteer</title>
</head>

<body>
    <div class="container">
        <div class="col-md-12">
            <p class="user">Alan 48 years</p>
        </div>
</body>

</html>

```

Lancez le test :

```bash
npm run test
```

Contenu du fichier user.test.js

```js
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

```

## Les actions avec Puppeteer

Vous pouvez à l'aide de Puppeteer lancer des actions afin de tester le comportement d'une page ou comparer des résultats attendus dans la page.

Par exemple la méthode suivante permet de déclencher l'action click sur un élément HTML du DOM, l'argument de cette méthode attend un sélecteur CSS :

```js
await page.click('[type="submit"]');
```

Attendre qu'un sélecteur soit présent après avoir cliqué sur le bouton submit :

```js
await page.waitForSelector('.success');
```

La méthode **type** permet de saisir un contenu dans un champ de formulaire, notez que le premier argument est encore un sélecteur CSS, il faudra d'abord cliquer dans le champ input puis le remplir :

```js
await page.click('input#password');
await page.type('#password','12345467890');
```

Voici la documentation de Puppeteer officiel elle vous permettra de faire l'exercice qui suit : [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=master&show=outline)

## 01 Exercice formulaire d'inscription

Créez le dossier Inscription dans le dossier d'exercice. Récupérez le code dans le dossier source sur le serveur et lancez l'installation :

```bash
npm install
```

Dans le fichier app.test.js vous écrirez l'ensemble des tests demandés. Voyez les consignes qui suivent :

1. Testez que lorsqu'on rentre un nom et un age ceux-ci s'affichent dans le div.last-user. Utilisez la méthode **eval** Puppeteer :

```js
await page.$eval('.last-user', el => el.textContent);
```

2. Testez maintenant le nombre d'étudiants avant et après les avoir ajoutés. Vous pouvez utiliser evaluate pour interagir avec le DOM.

```js
const nbUserBeforeAdd = await page.evaluate(async () => {
    const el = document.querySelectorAll('.users > li.item');

    return el.length || 0;
});

```

2. Le nom et l'age sont obligatoires testez les messages d'erreur dans le cas où ils ne sont pas correctement saisis. Voyez les messages d'erreur dans le fichier app.js dans les fichiers sources.
