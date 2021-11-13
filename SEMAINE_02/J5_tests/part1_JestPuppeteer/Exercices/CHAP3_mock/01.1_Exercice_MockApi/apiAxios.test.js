const axios = require('axios');
jest.mock('axios');

const fetchData = async id => {

    if(id === null) return Promise.reject("bad request");

    const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  
    return await axios.get(url);
  };

describe('fetchData', () => {
    it('fetches successfully data from an API', async () => {
        const user = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };
     
        axios.get.mockImplementationOnce(() => Promise.resolve(user));
      });

      it('fetches error from an API', async () => {
        const error = 'Bad request';
     
        axios.get.mockImplementationOnce(() =>
          Promise.reject(new Error(error)),
        );
      });

      it('fetches successfully data from an API', async () => {
        const data = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        };
     
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
     
        await expect(fetchData(1)).resolves.toEqual(data);
     
        expect(axios.get).toHaveBeenCalledWith(
            `https://jsonplaceholder.typicode.com/todos/1`,
        );
      });

      it('fetches successfully data from an API', async () => {
        const error = "bad request";
     
        axios.get.mockImplementationOnce(() => Promise.reject(error));
     
        await expect(fetchData(null)).rejects.toEqual(error);
     
        expect(axios.get).toHaveBeenCalledWith(
            `https://jsonplaceholder.typicode.com/todos/1`,
        );
      });
});