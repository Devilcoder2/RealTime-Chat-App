import express from "express";
import {
  adminLogin,
  allChats,
  allMessags,
  allUsers,
  getDashboardStats,
} from "../controllers/admin.js";

const app = express.Router();

app.get("/");

app.post("/verify", adminLogin);

app.get("/logout");

app.get("/users", allUsers);

app.get("/chats", allChats);

app.get("/messages", allMessags);

app.get("/stats", getDashboardStats);

export default app;
