
describe("test Shopping", () => {

  const shoppingList = ['beer', 'paper towels']

  test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContain('beer');
  });
 
});