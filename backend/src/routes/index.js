const express = require('express');
const userRoutes = require('./userRoutes');
const accessRoutes = require('./accessRoutes');
const blogRoutes = require('./blogRoutes');
const categoryRoutes = require('./categoryRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/access', accessRoutes);
router.use('/blogs', blogRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
