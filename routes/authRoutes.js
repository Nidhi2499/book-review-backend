const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup); // new user entry
router.post('/login', login); // existing user entry

module.exports = router;

