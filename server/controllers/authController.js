const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    const token = generateToken(user._id, user.role);
    // res.status(201).json({ token });
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      // console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // console.log('Input password:', password);
    // console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log('Is password correct?', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    if (!user.active) {
      return res.status(401).json({ message: 'Account is deactivated, kindly contact admin' });
    }

    const token = generateToken(user._id, user.role);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};



exports.getalluser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);  
  }
}
exports.toggleUserActiveStatus = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      user.active = active;
      await user.save();
      res.json({ message: 'User status updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};