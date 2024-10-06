const express = require('express');
const multer = require("multer");
const blogController = require('../controllers/blogController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('cover'), blogController.createBlog);
router.get('/', blogController.getBlogs);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
