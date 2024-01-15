const db = require('../db');

class MountainDAO {
    async getAllMountains() {
        const query = 'SELECT * FROM Mountain';
        const [mountains] = await db.query(query);
        return mountains;
    }

    async getMountainById(id) {
        const query = 'SELECT * FROM Mountain WHERE Id = ?';
        const [mountain] = await db.query(query, [id]);
        return mountain;
    }

    async addMountain(name, height, country, latitude, longitude) {
        const query = 'INSERT INTO Mountain (Name, Height, Country, Latitude, Longitude) VALUES (?, ?, ?, ?, ?)';
        const result = await db.query(query, [name, height, country, latitude, longitude]);
        return result;
    }

    async updateMountain(id, name, height, country, latitude, longitude) {
        const query = 'UPDATE Mountain SET Name = ?, Height = ?, Country = ?, Latitude = ?, Longitude = ? WHERE Id = ?';
        const result = await db.query(query, [name, height, country, latitude, longitude, id]);
        return result;
    }

    async deleteMountain(id) {
        const query = 'DELETE FROM Mountain WHERE Id = ?';
        const result = await db.query(query, [id]);
        return result;
    }
}

module.exports = MountainDAO;