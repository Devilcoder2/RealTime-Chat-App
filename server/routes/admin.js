import express from "express";
import { allChats, allMessags, allUsers } from "../controllers/admin.js";

const app = express.Router();

app.get("/");

app.post("/verify");

app.get("/logout");

app.get("/users", allUsers);

app.get("/chats", allChats);

app.get("/messages", allMessags);

app.get("/stats");

export default app;
