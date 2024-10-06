const express = require('express');
const userRoutes = require('./userRoutes');
const accessRoutes = require('./accessRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/access', accessRoutes);

module.exports = router;
