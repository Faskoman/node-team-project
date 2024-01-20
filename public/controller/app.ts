import { getGridItems } from "./Property.js";
import { getCurrentUser, handleUser, logout, newPostLink } from "./funcs.js";

async function app() {
  const user = await getCurrentUser();
  const items = await getGridItems();

  handleUser(user);
  logout();
  newPostLink();
}

app();
