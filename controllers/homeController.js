import { getPosts } from "../database/queries.js";

const getHomePage = async (req, res) => {
  const posts = await getPosts();
  if (res.locals.currentUser) {
    res.render("index", {
      title: "Clubhaus",
      page: "pages/home",
      posts: posts,
    });
  } else {
    res.redirect("/login");
  }
};

export { getHomePage };
