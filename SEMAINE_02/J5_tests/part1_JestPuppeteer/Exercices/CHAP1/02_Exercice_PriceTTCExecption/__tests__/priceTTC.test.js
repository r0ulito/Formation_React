const Price = require('./../priceTTC');

describe("test du module priceTTC Exeception", () => {
    it('should throw an error', () => {
        expect( () => Price.priceTTC("Bonjour") ).toThrow("Price is not a number")
      })
});