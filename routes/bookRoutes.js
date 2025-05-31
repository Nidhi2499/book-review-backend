const express = require('express');
const { createBook, getBooks, getBookDetails } = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, createBook);
router.get('/', getBooks);
router.get('/:id', getBookDetails);

module.exports = router;
