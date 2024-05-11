import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

//User must be logged In to access below routes
app.use(isAuthenticated);

export default app;
