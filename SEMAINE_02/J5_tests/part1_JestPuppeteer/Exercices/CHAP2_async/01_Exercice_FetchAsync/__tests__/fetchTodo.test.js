const fetchTodo = require('../fetchTodo');

describe("Fetch todo", () => {

    const user = { userId: 1, id: 1, title: 'delectus aut autem', completed: false }

    test('user test', async () => {
        const data = await fetchTodo(1);
        const json = await data.json();
        console.log(json);

        expect(json.userId).toBe(user.userId);
        expect(json.title).toBe(user.title);
    });
});