const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body; // pass the name, email, password in the request from the frontend
  try {
    const exists = await User.findOne({ email }); 
    if (exists) return res.status(400).json({ message: 'User already exists' }); // if user exists, display the message

    const hashed = await bcrypt.hash(password, 10); // encrypt the password
    const user = await User.create({ username, email, password: hashed }); 
    res.status(201).json({ message: 'User created', user: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body; //pass the  email, password in the request from the frontend
  try {
    const user = await User.findOne({ email }); // searches email in the db
    if (!user) return res.status(400).json({ message: 'Invalid credentials' }); // if not present or invalid , error message is displayed

    const match = await bcrypt.compare(password, user.password); // if email is right but password doesn't match
    if (!match) return res.status(400).json({ message: 'Invalid credentials' }); 

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET); // else jwt token is generated
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message }); // if try fails, server error status is displayed.
  }
};

