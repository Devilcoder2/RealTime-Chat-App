//Create a new user and save it to the database and save in cookie
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

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

const login = (req, res) => {
  res.send("Hello World");
};

export { newUser, login };
