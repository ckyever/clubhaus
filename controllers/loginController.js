
const getLoginPage = (req, res) => {
  if (res.locals.currentUser) {
    res.redirect("/");
  } else {
    res.render("login", { title: "Clubhaus | Login" });
  }
};

export { getLoginPage };
