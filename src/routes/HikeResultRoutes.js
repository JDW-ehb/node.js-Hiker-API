const HikerResultDAO = require('../database/daos/hikeResultDAO');
let express = require('express')
let router = express.Router()

let hikerResultDAO = new HikerResultDAO();


// Add a new hikeresult
router.post('/hiker-results', async (req, res) => {
    try {
        const { mountainId, hikerId, finished, time } = req.body;
        const result = await hikerResultDAO.addHikeResult(mountainId, hikerId, finished, time);
        res.status(201).json({ message: 'Hike result added', id: result.insertId });
    } catch (error) {
        res.status(500).send('Error adding hike result: ' + error.message);
    }
});

// Update a hikeresult
router.put('/hiker-results', async (req, res) => {
    try {
        const { mountainId, hikerId, finished, time } = req.body;
        await hikerResultDAO.updateHikeResult(mountainId, hikerId, finished, time);
        res.status(200).send('Hike result updated successfully');
    } catch (error) {
        res.status(500).send('Error updating hike result: ' + error.message);
    }
});

// Delete a hikeresult
router.delete('/hiker-results', async (req, res) => {
    try {
        const { mountainId, hikerId } = req.body;
        await hikerResultDAO.deleteHikeResult(mountainId, hikerId);
        res.status(200).send('Hike result deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting hike result: ' + error.message);
    }
});

// Get all hike results
router.get('/hiker-results', async (req, res) => {
    try {
        const results = await hikerResultDAO.getAllHikeResults();
        res.json(results);
    } catch (error) {
        res.status(500).send('Error retrieving hike results: ' + error.message);
    }
});

// Get hike results by hiker ID
router.get('/hiker-results/hiker/:hikerId', async (req, res) => {
    try {
        const hikerId = parseInt(req.params.hikerId);
        const results = await hikerResultDAO.getResultsByHiker(hikerId);
        res.json(results);
    } catch (error) {
        res.status(500).send('Error retrieving hike results: ' + error.message);
    }
});

// Get hike results by mountain ID
router.get('/hiker-results/mountain/:mountainId', async (req, res) => {
    try {
        const mountainId = parseInt(req.params.mountainId);
        const results = await hikerResultDAO.getResultsByMountain(mountainId);
        res.json(results);
    } catch (error) {
        res.status(500).send('Error retrieving hike results: ' + error.message);
    }
});



module.exports = router 