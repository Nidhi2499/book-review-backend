const express = require('express');
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/books/:id/reviews', auth, createReview);
router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;
