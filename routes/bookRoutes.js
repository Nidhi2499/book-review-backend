const express = require('express');
const { createBook, getBooks, getBookDetails ,searchBooks } = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, createBook); // creating the book deatail logics to be put in db
router.get('/', getBooks); // receive books stored in the db
router.get('/:id', getBookDetails); // getting book detail of a particular book using its id
router.get('/search', searchBooks); // search book by title or author

module.exports = router;
