const getHomePage = (req, res) => {
  if (res.locals.currentUser) {
    res.render("index", { title: "Clubhaus", page: "pages/home"});
  } else {
    res.redirect("/login");
  }
};

export { getHomePage };
