import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessags,
  allUsers,
  getDashboardStats,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

app.get("/");

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout);

app.get("/users", allUsers);

app.get("/chats", allChats);

app.get("/messages", allMessags);

app.get("/stats", getDashboardStats);

export default app;
