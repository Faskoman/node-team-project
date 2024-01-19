import { getJSON, handleUser, logout } from "./funcs.js";

async function app() {
  const user = await getJSON("/api/auth/currentUser");

  handleUser(user);
  logout();
}

app();
