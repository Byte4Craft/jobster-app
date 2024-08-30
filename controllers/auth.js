const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const { email, name, lastName, location } = user;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { email, name, lastName, location, token } });
};

const login = async (req, res) => {
  const { email: userEmail, password } = req.body;
  
  if (!userEmail || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const { email, name, lastName, location } = user;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { email, name, lastName, location, token } });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  
  res.status(StatusCodes.OK).json({ user: { email, name, lastName, location, token } });
};

module.exports = {
  register,
  login,
  updateUser
};
