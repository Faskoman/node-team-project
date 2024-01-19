import { getPropertyDetails } from "./Property.js";
import { getJSON, handleUser, logout } from "./funcs.js";

async function app() {
  const [user, property] = await Promise.all([
    getJSON("/api/auth/currentUser"),
    getPropertyDetails(window.location.hash.slice(1)),
  ]);

  console.log(user, property);

  handleUser(user);
  logout();
}

app();
