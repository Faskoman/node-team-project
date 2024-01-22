import { getProperties, getproperty, renderListItem } from "./Property.js";
import { getCurrentUser, handleUser, logout, newPostLink, changeModes } from "./funcs.js";

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

document.getElementById("color")?.addEventListener("click", changeModes);

document.forms.namedItem("filters")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const property = await getproperty(formData.get("search")?.toString());

  renderListItem(property);
});

app();
