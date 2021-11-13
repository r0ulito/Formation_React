const url = 'https://jsonplaceholder.typicode.com/todos';

const fetch = require('node-fetch');

const fetchTodo = id => {
    return fetch(`${url}/${id}`);
}


module.exports = fetchTodo ;
