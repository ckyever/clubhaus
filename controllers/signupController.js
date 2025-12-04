import { insertUser } from "../database/queries.js";
import { hash } from "bcryptjs";

const getSignupPage = (req, res) => {
  res.render("signup", { title: "Clubhaus | Sign Up" });
};

const createUser = async (req, res, next) => {
  try {
    const SALT_ROUNDS = 10;
    const hashedPassword = await hash(req.body.password, SALT_ROUNDS);
    await insertUser(
      req.body.username,
      hashedPassword,
      req.body.firstname,
      req.body.lastname
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { getSignupPage, createUser };
