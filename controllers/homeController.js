const getHomePage = (req, res) => {
  res.render("index", { title: "Clubhaus", page: "pages/home"});
};

export { getHomePage };
