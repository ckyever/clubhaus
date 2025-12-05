import { insertPost } from "../database/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const getNewPostPage = (req, res) => {
  if (res.locals.currentUser) {
    res.render("index", {
      title: "Clubhaus | New Post",
      page: "pages/new-post",
    });
  } else {
    res.redirect("/login");
  }
};

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title must be 255 characters or less"),
  body("body")
    .trim()
    .isLength({ max: 40000 })
    .withMessage("Title must be 40,000 characters or less"),
];

const createPost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", {
        title: "Clubhaus | New Post",
        page: "pages/new-post",
        errors: errors.array(),
      });
    }

    const { title, body } = matchedData(req);
    try {
      await insertPost(title, body, res.locals.currentUser.id);
    } catch (error) {
      console.error(error);
      return res.render("index", {
        title: "Clubhaus | New Post",
        page: "pages/new-post",
        errors: [{ msg: "Unable to create a new post" }],
      });
    }
    return res.redirect("/");
  },
];

export { getNewPostPage, createPost };
