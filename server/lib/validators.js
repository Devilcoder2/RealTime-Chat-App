import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter username").notEmpty(),
  body("bio", "Please Enter bio").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
];

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

export { registerValidator, validateHandler };
