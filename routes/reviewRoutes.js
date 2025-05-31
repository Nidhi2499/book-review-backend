const express = require('express');
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/books/:id/reviews', auth, createReview); // route to create review
router.put('/reviews/:id', auth, updateReview); // update the review
router.delete('/reviews/:id', auth, deleteReview); // delete the review

module.exports = router;
