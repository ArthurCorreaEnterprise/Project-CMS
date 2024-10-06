const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/register', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
