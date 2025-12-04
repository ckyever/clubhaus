const getVipPage = (req, res) => {
  if (res.locals.currentUser) {
    res.render("index", { title: "Clubhaus | VIP", page: "pages/vip"});
  } else {
    res.redirect("/login");
  }
};

export { getVipPage };
