import passport from "passport";
import LocalStrategy from "passport-local";
import { pool } from "../database/pool.js";
import { compare } from "bcryptjs";
import { getUser } from "../database/queries.js";

const initPassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const errorMessage = "Incorrect username or password";
      try {
        const user = await getUser(username);

        if (!user) {
          return done(null, false, { message: errorMessage });
        }
        const match = await compare(password, user.password);
        if (!match) {
          return done(null, false, { message: errorMessage });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const user = rows[0];

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export { initPassport };
