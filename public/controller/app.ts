import { getCurrentUser, handleUser, logout, manageLoginBtn } from "./funcs.js";

async function app() {
  const user = await getCurrentUser();

  handleUser(user);
  manageLoginBtn(user);
  logout();
}

app();
