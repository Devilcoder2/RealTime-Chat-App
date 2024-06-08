import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { attachmentMulter } from "../middlewares/multer.js";
import {
  addMemberValidator,
  leaveGroupValidator,
  newGroupValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express.Router();

//User must be logged In to access below routes
app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

app.get("my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addMembers", addMemberValidator(), validateHandler, addMembers);

app.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

app.delete("/leave/:id", leaveGroupValidator(), validateHandler, leaveGroup);

app.post(
  "/message",
  attachmentMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

app.get("/messages/:id", getMessages);

app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
