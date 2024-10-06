const express = require('express');
const accessController = require('../controllers/accessController');

const router = express.Router();

router.post('/register', accessController.createAccess);
router.get('/', accessController.getAccess);

module.exports = router;
