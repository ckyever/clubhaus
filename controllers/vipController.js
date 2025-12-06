import { body, validationResult, matchedData } from "express-validator";
import {
  isAdminPassphraseCorrect,
  isVipPassphraseCorrect,
  updateUserPrivileges,
} from "../database/queries.js";

const getVipPage = (req, res) => {
  if (res.locals.currentUser) {
    res.render("index", { title: "Clubhaus | VIP", page: "pages/vip" });
  } else {
    res.redirect("/login");
  }
};

const validatePassphrase = [
  body("passphrase")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Passphrase is 50 characters or less"),
];

const submitPassphrase = [
  validatePassphrase,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "Clubhaus | VIP",
        page: "pages/vip",
        errors: errors.array(),
      });
    }

    const { passphrase } = matchedData(req);

    if (await isAdminPassphraseCorrect(passphrase)) {
      updateUserPrivileges(res.locals.currentUser.id, true, true);
      return res.redirect("/vip");
    } else {
      if (await isVipPassphraseCorrect(passphrase)) {
        updateUserPrivileges(res.locals.currentUser.id, true, false);
        return res.redirect("/vip");
      } else {
        return res.status(400).render("index", {
          title: "Clubhaus | VIP",
          page: "pages/vip",
          errors: [{ msg: "Womp womp that's wrong" }],
        });
      }
    }
  },
];

export { getVipPage, submitPassphrase };
