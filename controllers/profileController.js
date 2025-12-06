import { getUser, updateUserProfile } from "../database/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const getProfilePage = async (req, res) => {
  if (res.locals.currentUser) {
    res.render("index", {
      title: "Clubhaus | Profile",
      page: "pages/profile",
    });
  } else {
    res.redirect("/login");
  }
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
];

const updateProfile = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "Clubhaus | Profile",
        page: "pages/profile",
        errors: errors.array(),
      });
    }

    const { username, firstname, lastname } = matchedData(req);
    const updateSuccess = await updateUserProfile(
      res.locals.currentUser.id,
      username,
      firstname,
      lastname
    );
    if (updateSuccess) {
      return res.redirect("/profile");
    } else {
      return res.render("index", {
        title: "Clubhaus | Profile",
        page: "pages/profile",
        errors: [{ msg: `Unable to update profile` }],
      });
    }
  },
];

export { getProfilePage, updateProfile };
