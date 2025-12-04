const getSettingsPage = (req, res) => {
  if (res.locals.currentUser) {
    res.render("index", { title: "Clubhaus | Settings", page: "pages/settings"});
  } else {
    res.redirect("/login");
  }
};

export { getSettingsPage };
