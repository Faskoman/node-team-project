import { getCurrentUser, handleUser, logout, redirect } from "./funcs.js";

async function app() {
  const user = await getCurrentUser();

  handleUser(user);
  logout();
  redirect();
}

app();
