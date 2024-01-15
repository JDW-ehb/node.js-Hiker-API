const MountainDAO = require('../database/daos/mountainDAO');
let express = require('express')
let router = express.Router()

let mountainDAO = new MountainDAO();


// Get all mountains
router.get('/mountains', async (req, res) => {
    try {
        const mountains = await mountainDAO.getAllMountains();
        res.json(mountains);
    } catch (error) {
        res.status(500).send('Error retrieving mountains: ' + error.message);
    }
});

// Get mountain by ID
router.get('/mountains/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const mountain = await mountainDAO.getMountainById(id);
        if (mountain.length > 0) {
            res.json(mountain);
        } else {
            res.status(404).send('Mountain not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving mountain: ' + error.message);
    }
});

// Add a new mountain
router.post('/mountains', async (req, res) => {
    try {
        const { name, height, country, latitude, longitude } = req.body;
        const result = await mountainDAO.addMountain(name, height, country, latitude, longitude);
        res.status(201).send(`Mountain added with ID: ${result.insertId}`);
    } catch (error) {
        res.status(500).send('Error adding mountain: ' + error.message);
    }
});

// Update a mountain
router.put('/mountains/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, height, country, latitude, longitude } = req.body;
        await mountainDAO.updateMountain(id, name, height, country, latitude, longitude);
        res.send('Mountain updated successfully');
    } catch (error) {
        res.status(500).send('Error updating mountain: ' + error.message);
    }
});

// Delete a mountain
router.delete('/mountains/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await mountainDAO.deleteMountain(id);
        res.send('Mountain deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting mountain: ' + error.message);
    }
});


module.exports = router 