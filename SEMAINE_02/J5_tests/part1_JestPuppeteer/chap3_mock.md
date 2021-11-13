# Mock

Nous allons découvrir une technique de simulation (mock) dans Jest permettant de remplacer des fonctions ou API.

Dans l'exemple suivant nous allons remplacer la fonction callback par une fonction de simulation (mock).

```js
const forEach = (items, callback) => {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockFunc = jest.fn( x => 100 + x );
forEach([ 0, 1, 2 ], mockFunc);

// la première valeur 0 passée à la fonction retournera 100
expect(mockFunc.mock.results[0].value).toBe(100);
```

## Simulation du retour d'une valeur

Vous pouvez également définir le retour d'une fonction à l'aide des fonctions de simulation :

```js
const mockFun = jest.fn();

// définition des retours possibles de la fonction
mockFun
  .mockReturnValueOnce(1)
  .mockReturnValueOnce(2)
  .mockReturnValueOnce(3)
  // dernière valeur retournée
  .mockReturnValue("foo");

// Appel de la fonction de simulation
console.log(myMock(), myMock(), myMock(), myMock(),  myMock(),  myMock() );
// affichera 1 2 3 et foo ...

```

Vous pouvez également simuler une fonction passée en paramètre :

```js
const filterMock = jest.fn();

// respectivement pour chaque appel on aura : true, true, true puis false
filterMock
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false);

const result = [11, 12, 13, 14].filter( num => filterMock(num) );
// [11, 12, 13]
```

Vous pouvez récupérer en utilisant la méthode calls les valeurs passées à la fonction filterMock :

```js
console.log(filterMock.mock.calls);
// [ [11], [12], [13], [14] ]
```

## Mock librairie

Il est possible également de simuler la consommation d'API. En effet, lorsque vous écrivez des tests vous ne devez pas tester l'API elle-même mais l'algorithmique de vos scripts. De plus si vous continuez à consommer vos API dans vos tests, vous ralentissez leur exécution.

```js
const axios = require('axios');
jest.mock('axios');

const fetchData = async id => {
    if(id === null) return Promise.reject("bad request");
    const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  
    return await axios.get(url);
};
```

Voyez ci-dessous un exemple de simulation d'API :

```js

// En cas de succès
it('fetches successfully data from an API', async () => {
  const user = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
  };

  axios.get.mockImplementationOnce(() => Promise.resolve(user));
});

// En cas d'échec
it('fetches error from an API', async () => {
  const error = 'Bad request';

  axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error(error)),
  );
});
```

## 01 Exercice mock

Reprennez le code ci-dessus et testez le succès et l'échec du retour de l'API :

```js

  const data = {  }
  const error = "bad request";

  axios.get.mockImplementationOnce(() => Promise.resolve(data));
  axios.get.mockImplementationOnce(() => Promise.reject(error));
  ```
