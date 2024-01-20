import { getCurrentUser, handleUser, logout } from "./funcs.js";

async function app() {
  const user = await getCurrentUser();

  handleUser(user);

  logout();
}

app();
