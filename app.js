import express from "express";
import path from "node:path";
import { homeRouter } from "./routes/homeRouter.js";
import { signupRouter } from "./routes/signupRouter.js";
import { loginRouter } from "./routes/loginRouter.js";
import { logoutRouter } from "./routes/logoutRouter.js";
import { vipRouter } from "./routes/vipRouter.js";
import { settingsRouter } from "./routes/settingsRouter.js";
import passport from "passport";
import session from "express-session";
import sessionStore from "connect-pg-simple";
import { pool } from "./database/pool.js";
import "dotenv/config"
import { initPassport } from "./controllers/authenticateController.js";

const currentDirectory = process.cwd();
const app = express();

app.set("views", path.join(currentDirectory, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    store: new (sessionStore(session))({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// Make user info available to middleware and views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

initPassport();

const assetsPath = path.join(currentDirectory, "public");
app.use(express.static(assetsPath));

app.use("/", homeRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/vip", vipRouter);
app.use("/settings", settingsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Last updated ${new Date().toISOString()}`);
});
