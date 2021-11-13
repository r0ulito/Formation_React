# Préparation avant et après les tests

## beforeEach et afterEach

Vous pouvez vouloir préparer et configurer des données à utiliser dans vos tests avant ou après les avoir lancés. Jest fournit deux méthodes respectivement beforeEach et afterEach qui se lanceront avant et après chaque test. Ces méthodes sont utilisées par exemple pour se connecter à un service puis s'en déconnecter pour chaque test. Cela permettra d'éviter des effets de bord si on modifie des données : initialisation/réinitialisation du service.

```js
let service = null ;

// Avant chaque test
beforeEach(() => {
  service = connectService();
});

// Après chaque test
afterEach(() => {
  removeDataService();
  disconnectService();

  service = null;
});

test('test 1', () => {
  service.setUser({"name" : "Alan" });
  expect( service.where("name", "Alan").get()).toEqual("Alan");
});

test('test 2', () => {
  service.setUser({"name" : "Alice" });
  expect( service.where("name", "Alice").get()).toEqual("Alice");
  expect( service.where("name", "Alan").get()).toEqual(null);
});

```

## beforeAll et afterAll

Vous pouvez lancer une action avant et après tous les tests à l'aide des méthodes beforeAll et afterAll.

```js

let service = null ;
beforeAll(() => {
  connectService();
});

afterAll(() => {
  
  disconnectService(service);
  service = null;
});

test('test 1', () => {
  service.setUser({"name" : "Alan" });
  expect( service.where("name", "Alan").get()).toEqual("Alan");
});

test('test 2', () => {
  service.setUser({"name" : "Alice" });
  expect( service.where("name", "Alice").get()).toEqual("Alice");
  expect( service.where("name", "Alan").get()).toEqual("Alan");
});

```
