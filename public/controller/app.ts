import { getProperties, renderListItem } from "./Property.js";
import { getCurrentUser, handleUser, logout, newPostLink } from "./funcs.js";

async function app() {
  const [user, properties] = await Promise.all([
    await getCurrentUser(),
    await getProperties(),
  ]);

  renderListItem(properties);
  handleUser(user);
  logout();
  newPostLink();
}

app();
