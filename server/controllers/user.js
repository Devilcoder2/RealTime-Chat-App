//Create a new user and save it to the database and save in cookie
import { User } from "../models/user.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "adsfasdf",
    url: "adlkfads",
  };

  await User.create({
    name,
    username,
    bio,
    password,
    avatar,
  });

  res.status(201).json({ message: "User created successfully" });
};

const login = (req, res) => {
  res.send("Hello World");
};

export { newUser, login };
