import express from "express";
import { allUsers } from "../controllers/admin.js";

const app = express.Router();

app.get("/");

app.post("/verify");

app.get("/logout");

app.get("/users", allUsers);

app.get("/chats");

app.get("/messages");

app.get("/stats");

export default app;
