const CheckpointDAO = require('../database/daos/checkpointDAO');
let express = require('express')
let router = express.Router()

let checkpointDAO = new CheckpointDAO();


// Get all checkpoints
router.get('/checkpoints', async (req, res) => {
    try {
        const checkpoints = await checkpointDAO.getAllCheckpoints();
        res.json(checkpoints);
    } catch (error) {
        res.status(500).send('Error retrieving checkpoints: ' + error.message);
    }
});

// Get checkpoint by ID
router.get('/checkpoints/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const checkpoint = await checkpointDAO.getCheckpointById(id);
        if (checkpoint.length > 0) {
            res.json(checkpoint);
        } else {
            res.status(404).send('Checkpoint not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving checkpoint: ' + error.message);
    }
});

// Add a new checkpoint
router.post('/checkpoints', async (req, res) => {
    try {
        const { mountainId, name, height } = req.body;
        const result = await checkpointDAO.addCheckpoint(mountainId, name, height);
        res.status(201).send(`Checkpoint added with ID: ${result.insertId}`);
    } catch (error) {
        res.status(500).send('Error adding checkpoint: ' + error.message);
    }
});

// Update a checkpoint
router.put('/checkpoints/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { mountainId, name, height } = req.body;
        await checkpointDAO.updateCheckpoint(id, mountainId, name, height);
        res.send('Checkpoint updated successfully');
    } catch (error) {
        res.status(500).send('Error updating checkpoint: ' + error.message);
    }
});

// Delete a checkpoint
router.delete('/checkpoints/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await checkpointDAO.deleteCheckpoint(id);
        res.send('Checkpoint deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting checkpoint: ' + error.message);
    }
});



module.exports = router 