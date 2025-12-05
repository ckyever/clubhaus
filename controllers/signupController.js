import { insertUser } from "../database/queries.js";
import { hash } from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";

const getSignupPage = (req, res) => {
  res.render("signup", { title: "Clubhaus | Sign Up" });
};

const requiredFieldError = "is required";
const longFieldError = "must be 255 characters or less";
const shortFieldError = "must be 50 characters or less";

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username " + requiredFieldError)
    .isLength({ max: 255 })
    .withMessage("Username " + longFieldError),
  body("firstname")
    .trim()
    .isLength({ max: 50 })
    .withMessage("First name " + shortFieldError),
  body("lastname")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Last name " + shortFieldError),
  body("password")
    .notEmpty()
    .withMessage("Password " + requiredFieldError)
    .isLength({ max: 50 })
    .withMessage("Password " + longFieldError),
  body("confirm-password")
    .notEmpty()
    .withMessage("Please confirm password")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Confirmation password does not match");
      }
      return true;
    })
    .withMessage("Passwords do not match"),
];

const createUser = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        title: "Clubhaus | Sign Up",
        errors: errors.array(),
      });
    }

    try {
      const { username, password, firstname, lastname } = matchedData(req);
      const SALT_ROUNDS = 10;
      const hashedPassword = await hash(password, SALT_ROUNDS);
      await insertUser(username, hashedPassword, firstname, lastname);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

export { getSignupPage, createUser };
