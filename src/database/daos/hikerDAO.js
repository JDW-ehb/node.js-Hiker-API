const db = require('../db');

class HikerDAO {
    async getAllHikers() {
        const query = 'SELECT * FROM Hiker';
        const [hikers] = await db.query(query);
        return hikers;
    }

    async getHikerById(id) {
        const query = 'SELECT * FROM Hiker WHERE Id = ?';
        const [hiker] = await db.query(query, [id]);
        return hiker;
    }

    async getHikerMountains(id) {
        const query = 'SELECT * FROM Mountain WHERE Id IN (SELECT MountainId FROM HikeResult WHERE HikerId = ?);';
        const [mountains] = await db.query(query, [id]);
        return mountains;
    }

    async addHiker(firstName, lastName, age, guide) {
        const query = 'INSERT INTO Hiker (FirstName, LastName, Age, Guide) VALUES (?, ?, ?, ?)';
        const result = await db.query(query, [firstName, lastName, age, guide]);
        return result;
    }

    async updateHiker(id, firstName, lastName, age, guide) {
        const query = 'UPDATE Hiker SET FirstName = ?, LastName = ?, Age = ?, Guide = ? WHERE Id = ?';
        const result = await db.query(query, [firstName, lastName, age, guide, id]);
        return result;
    }

    async deleteHiker(id) {
        const query = 'DELETE FROM Hiker WHERE Id = ?';
        const result = await db.query(query, [id]);
        return result;
    }
}

module.exports = HikerDAO;