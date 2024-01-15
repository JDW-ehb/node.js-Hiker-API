const db = require('../db');

class CheckpointDAO {
    async getAllCheckpoints() {
        const query = 'SELECT * FROM Checkpoints';
        const [checkpoints] = await db.query(query);
        return checkpoints;
    }

    async getCheckpointById(id) {
        const query = 'SELECT * FROM Checkpoints WHERE Id = ?';
        const [checkpoint] = await db.query(query, [id]);
        return checkpoint;
    }

    async addCheckpoint(mountainId, name, height) {
        const query = 'INSERT INTO Checkpoints (MountainId, Name, Height) VALUES (?, ?, ?)';
        const result = await db.query(query, [mountainId, name, height]);
        return result;
    }

    async updateCheckpoint(id, mountainId, name, height) {
        const query = 'UPDATE Checkpoints SET MountainId = ?, Name = ?, Height = ? WHERE Id = ?';
        const result = await db.query(query, [mountainId, name, height, id]);
        return result;
    }

    async deleteCheckpoint(id) {
        const query = 'DELETE FROM Checkpoints WHERE Id = ?';
        const result = await db.query(query, [id]);
        return result;
    }
}

module.exports = CheckpointDAO;
