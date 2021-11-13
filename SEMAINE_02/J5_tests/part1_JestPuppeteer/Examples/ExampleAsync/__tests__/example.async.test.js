const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true);
    }, 300);
});

test('the data is peanut butter', () => {
    return p1.then(res => {
        expect(res).toBe(true);
    });
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("async/await");
    }, 300);
});

test('test async/await', async () => {
  const result = await p2;
  expect(result).toBe("async/await");
});