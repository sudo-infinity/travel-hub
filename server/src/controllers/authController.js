/* eslint-disable quote-props */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../models/User');
const User = require('../models/User');

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: 'unauthorized' });

  const accessToken = jwt.sign({
    'UserInfo': { 'username': foundUser.username },
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

  const refreshToken = jwt.sign(
    { 'username': foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' },
  );

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
});

const refresh = (req, res) => {

};

const logout = (req, res) => {

};
