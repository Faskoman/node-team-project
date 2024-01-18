import { getJSON, handleUser, redirect } from "./funcs.js";

async function app() {
  const user = await getJSON("/api/auth/currentUser");
  
  handleUser(user);
  redirect();
}

app();
