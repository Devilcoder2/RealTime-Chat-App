//Create a new user and save it to the database and save in cookie
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { compare } from "bcrypt";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "adsfasdf",
    url: "adlkfads",
  };

  const user = await User.create({
    name,
    username,
    bio,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User Created");
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new Error("Invalid Username"));

  const isMatch = await compare(password, user.password);
  if (!isMatch) return next(new Error("Invalid Password"));

  sendToken(res, user, 201, `Welcome Back ${user.name}`);
};

const getMyProfile = async (req, res) => {};

export { newUser, login, getMyProfile };
