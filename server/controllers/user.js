//Create a new user and save it to the database and save in cookie
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST } from "../constants/events.js";

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

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 201, `Welcome Back ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("chat-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully ",
    });
});

const searchUser = TryCatch(async (req, res, next) => {
  const { name = "" } = req.query;

  const myChats = await Chat.find({ groupChat: false, members: req.user });

  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    // name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ id, name, avatar }) => ({
    id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("Request Not found", 404));

  if (request.receiver.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not authorized to accept this request", 401)
    );

  if (!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });
});

export {
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
};
