import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, getMyGroups, newGroupChat } from "../controllers/chat.js";

const app = express.Router();

//User must be logged In to access below routes
app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("my", getMyChats);

app.get("/my/groups", getMyGroups);

export default app;
