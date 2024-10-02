// api/routes/accessRoutes.js

const express = require('express');
const accessController = require('../controllers/accessController');

const router = express.Router();

router.get('/access', accessController.listAccess);
router.post('/access', accessController.createAccess);

module.exports = router;
