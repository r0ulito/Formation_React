# Tester du code asynchrone

## Introduction

Voici un exemple de test qui ne marche pas avec Jest. Il passera de manière incorrecte car, Jest ne sait pas que nous effectuons une opération asynchrone :

```js
test('should not pass', () => {
  const p = Promise.resolve(false);

  p.then(value => {
    expect(value).toBe(true);
  })
})

```

Par contre le test ci-dessous marchera. Il faut donc retourner une promesse pour que Jest résolve celle-ci et effectue le test.

```js
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true);
    }, 300);
});

// le test doit retourner une promesse
test('promise', () => {
    return p.then(res => {
        expect(res).toBe(true);
    });
});
```

## Resolves et rejects

Vous pouvez utiliser les méthodes resolves ou rejects pour tester si une promesse est soit résolue soit rejetée, dans ce cas il faudra écrire le code suivant :

```js
// Dans le cas d'une promesse résolue
test('test resolve', () => {
  return expect(fetchData()).resolves.toBe('Yes !');
});

// Dans le cas d'une promesse rejetée
test('test reject', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

## Méthode async/await en JS

Les mots clés Async et await, dans une fonction, permettent de rendre synchrones des actions asynchrones.

```js
const data = async () => {

  const data = await fetchData();
  const json = await data.json();

  return json;
}

// Pour exécuter le code
data.then( json => json );
```

Reprenons l'exemple précédent avec une promesse, vous pouvez à l'aide de cette technique écrire maintenant le test suivant :

```js
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("async/await");
    }, 300);
});

test('test async/await', async () => {
  const result = await p2;
  expect(result).toBe("async/await");
});

```

### 01 Exercice test async/await

Pour utiliser "fetch" dans le contexte Node installer le module suivant dans votre projet :

```bash
npm install node-fetch --save
```

Ci-dessous on utilisera le service jsonplaceholder, reprennez le code suivant dans votre test :

```js

const url = 'https://jsonplaceholder.typicode.com/todos';

const fetch = require('node-fetch');

const fetchTodo = id => {
    return fetch(`${url}/${id}`);
}

module.exports = fetchTodo ;

fetchTodo(1).then( data => data.json() ).then( json => console.log(json) );

```

Testez que le service retourne bien l'objet suivant :

```js
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
*/

// Configuration de votre test

```

### Reject test

Soit la fonction **parity** suivante qui retourne une promesse; testez qu'elle soit rejetée si le nombre est pair et résolue si il est impair :

```js
const parity = number =>  new Promise( (resolve, reject) => {
  if( number % 2 === 0) reject("even");
  else resolve("odd");
});
```
