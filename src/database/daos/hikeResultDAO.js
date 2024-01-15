const db = require('../db');

class HikerResultDAO {
    async addHikeResult(mountainId, hikerId, finished, time) {
        const query = 'INSERT INTO HikeResult (MountainId, HikerId, Finished, Time) VALUES (?, ?, ?, ?)';
        const result = await db.query(query, [mountainId, hikerId, finished, time]);
        return result;
    }

    async updateHikeResult(mountainId, hikerId, finished, time) {
        const query = 'UPDATE HikeResult SET Finished = ?, Time = ? WHERE MountainId = ? AND HikerId = ?';
        const result = await db.query(query, [finished, time, mountainId, hikerId]);
        return result;
    }

    async deleteHikeResult(mountainId, hikerId) {
        const query = 'DELETE FROM HikeResult WHERE MountainId = ? AND HikerId = ?';
        const result = await db.query(query, [mountainId, hikerId]);
        return result;
    }

    async getResultsByHiker(hikerId) {
        const query = 'SELECT * FROM HikeResult WHERE HikerId = ?';
        const [results] = await db.query(query, [hikerId]);
        return results;
    }

    async getResultsByMountain(mountainId) {
        const query = 'SELECT * FROM HikeResult WHERE MountainId = ?';
        const [results] = await db.query(query, [mountainId]);
        return results;
    }
    
    async getAllHikeResults() {
        const query = 'SELECT * FROM HikeResult';
        const [results] = await db.query(query);
        return results;
    }
}

module.exports = HikerResultDAO;
