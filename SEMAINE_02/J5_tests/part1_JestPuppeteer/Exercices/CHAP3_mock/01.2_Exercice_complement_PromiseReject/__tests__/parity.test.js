const parity = require('../parity');

describe("Test resolve and reject", () => {

    test('resolve odd number', () => {
        return expect(parity(11)).resolves.toBe("odd");
    });

    test('reject even number', () => {
        return expect(parity(18)).rejects.toBe("even");
    });
});