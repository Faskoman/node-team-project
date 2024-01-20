import { getCurrentUser, handleUser, logout, newPostLink } from "./funcs.js";

async function app() {
  const user = await getCurrentUser();

  handleUser(user);
  logout();
  newPostLink();
}

app();
