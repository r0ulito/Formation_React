let resultat = null ;
beforeAll(() => {
  resultat = 3 * 11;
  console.log(resultat);
});

afterAll(() => {
  resultat = 0;
  console.log(resultat);
});

test('test divisible par 7 et 3', () => {
  resultat = resultat * 7 ; 
  expect( resultat % 7  === 0 &&  resultat % 3  === 0).toEqual(true);
});

test('test divisible par 3 mais pas 7', () => {

  console.log('valeur qui a changé', resultat);

  expect(resultat % 7  != 0 &&  resultat % 3  === 0).toEqual(false);
});