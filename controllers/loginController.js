
const getLoginPage = (req, res) => {
  if (res.locals.currentUser) {
    res.redirect("/");
  } else {
    res.render("login", { title: "Clubhaus | Login", errorMessage: req.flash('error') });
  }
};

export { getLoginPage };
