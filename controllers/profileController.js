const getProfilePage = (req, res) => {
  if (res.locals.currentUser) {
    res.render("index", { title: "Clubhaus | Profile", page: "pages/profile" });
  } else {
    res.redirect("/login");
  }
};

export { getProfilePage };
