import { getUser } from "../database/queries.js";

const getUsername = async (req, res) => {
  const username = req.params.username;
  if (username) {
    const user = await getUser(username);
    if (user) {
      res.json({ success: true, user: user });
    } else {
      res.json({ success: false, users: null });
    }
  }
};

export { getUsername };
