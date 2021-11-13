const { MongoClient } = require('mongodb');

describe('insert', () => {
    let connection;
    let db;


    beforeAll(async () => {
        const url = 'mongodb://localhost:27017';
        connection = await MongoClient.connect(url, {
            useNewUrlParser: true,
        });
        db = await connection.db("school");
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('should insert a doc into collection', async () => {
        const collection = db.collection('users');

        const count = await collection.count();

        expect(count).toEqual(4);

    });
});