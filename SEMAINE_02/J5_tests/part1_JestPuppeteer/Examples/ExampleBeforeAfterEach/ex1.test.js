let resultat = null ;

beforeEach(() => {
  resultat = 3 * 11;
  console.log(resultat);
});

afterEach(() => {
  resultat = 0;
  console.log(resultat);
});

test('test divisible par 7 et 3', () => {
  resultat = resultat * 7 ; 
  expect( resultat % 7  === 0 &&  resultat % 3  === 0).toEqual(true);
});

test('test divisible par 3 mais pas 7', () => {
  expect(resultat % 7  != 0 &&  resultat % 3  === 0).toEqual(true);
});