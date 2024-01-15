const db = require('../db');

class MountainHikerDAO {
    async addMountainHiker(mountainId, hikerId) {
        const query = 'INSERT INTO MountainHiker (MountainId, HikerId) VALUES (?, ?)';
        const result = await db.query(query, [mountainId, hikerId]);
        return result;
    }

    async deleteMountainHiker(mountainId, hikerId) {
        const query = 'DELETE FROM MountainHiker WHERE MountainId = ? AND HikerId = ?';
        const result = await db.query(query, [mountainId, hikerId]);
        return result;
    }

    async getHikersByMountain(mountainId) {
        const query = 'SELECT * FROM Hiker INNER JOIN MountainHiker ON Hiker.Id = MountainHiker.HikerId WHERE MountainHiker.MountainId = ?';
        const [hikers] = await db.query(query, [mountainId]);
        return hikers;
    }

    async getMountainsByHiker(hikerId) {
        const query = 'SELECT * FROM Mountain INNER JOIN MountainHiker ON Mountain.Id = MountainHiker.MountainId WHERE MountainHiker.HikerId = ?';
        const [mountains] = await db.query(query, [hikerId]);
        return mountains;
    }
}

module.exports = MountainHikerDAO;
