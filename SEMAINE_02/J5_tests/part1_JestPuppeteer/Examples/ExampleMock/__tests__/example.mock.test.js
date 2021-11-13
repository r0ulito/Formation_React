
test('test async/await', async () => {
    const forEach = (items, callback) => {
        for (let index = 0; index < items.length; index++) {
            callback(items[index]);
        }
    }

    const mockFunc = jest.fn(x => 100 + x);
    forEach([0, 1, 2], mockFunc);

    // la première valeur 0 passée à la fonction retournera 100
    expect(mockFunc.mock.results[0].value).toBe(100);
});