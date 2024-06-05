import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  newGroupChat,
  removeMember,
} from "../controllers/chat.js";

const app = express.Router();

//User must be logged In to access below routes
app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addMembers", addMembers);

app.put("/removemember", removeMember);

export default app;
