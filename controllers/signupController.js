const getSignupPage = (req, res) => {
  res.render("signup", { title: "Clubhaus | Sign Up" });
};

export { getSignupPage };
