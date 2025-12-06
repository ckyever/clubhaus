import { getPosts } from "../database/queries.js";

const getHomePage = async (req, res) => {
  const posts = await getPosts();
  res.render("index", {
    title: "Clubhaus",
    page: "pages/home",
    posts: posts,
  });
};

export { getHomePage };
