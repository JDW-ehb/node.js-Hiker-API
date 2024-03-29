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

// Get all mountain hikers
router.get('/mountains/:id/hikers', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const hikers = await mountainDAO.getMountainHikers(id);
        if (hikers.length > 0) {
            res.json(hikers);
        } else {
            res.status(404).send('Hikers not found for mountain');
        }
    } catch (error) {
        res.status(500).send('Error retrieving hikers for mountain: ' + error.message);
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

// Add hiker to mountain
router.post('/mountains/hikers', async (req, res) => {
    try {
        const mountainId = parseInt(req.params.id);
        const { hikerId } = req.body;
        const result = await mountainDAO.addHikerToMountain(mountainId, hikerId);
        res.status(201).send(`Hiker added to mountain with ID: ${result.insertId}`);
    } catch (error) {
        res.status(500).send('Error adding hiker to mountain: ' + error.message);
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