const HikerDAO = require('../database/daos/hikerDAO');
let express = require('express')
let router = express.Router()

let hikerDAO = new HikerDAO();


// Get all hikers
router.get('/hiker', async (req, res) => {
    try {
        const hikers = await hikerDAO.getAllHikers();
        res.json(hikers);
    } catch (error) {
        res.status(500).send('Error retrieving hikers: ' + error.message);
    }
});

// Get hiker by ID
router.get('/hiker/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const hiker = await hikerDAO.getHikerById(id);
        if (hiker.length > 0) {
            res.json(hiker);
        } else {
            res.status(404).send('Hiker not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving hiker: ' + error.message);
    }
});

// Get all hiker mountains
router.get('/hiker/:id/mountains', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const mountains = await hikerDAO.getHikerMountains(id);
        if (mountains.length > 0) {
            res.json(mountains);
        } else {
            res.status(404).send('Mountains not found for hiker');
        }
    } catch (error) {
        res.status(500).send('Error retrieving mountains for hiker: ' + error.message);
    }
});

// Add a new hiker
router.post('/hiker', async (req, res) => {
    try {
        const { firstName, lastName, age, guide } = req.body;
        const result = await hikerDAO.addHiker(firstName, lastName, age, guide);
        res.status(201).send(`Hiker added!`);
    } catch (error) {
        res.status(500).send('Error adding hiker: ' + error.message);
    }
});

// Update a hiker
router.put('/hiker/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { firstName, lastName, age, guide } = req.body;
        await hikerDAO.updateHiker(id, firstName, lastName, age, guide);
        res.send('Hiker updated successfully');
    } catch (error) {
        res.status(500).send('Error updating hiker: ' + error.message);
    }
});

// Delete a hiker
router.delete('/hiker/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await hikerDAO.deleteHiker(id);
        res.send('Hiker deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting hiker: ' + error.message);
    }
});


module.exports = router 