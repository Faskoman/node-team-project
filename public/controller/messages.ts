import { getCurrentUser, getJSON, handleUser, logout } from "./funcs.js";

console.log("connected");

async function app() {
  const [user, messages] = await Promise.all([
    await getCurrentUser(),
    await getMessages(),
  ]);

  console.log(user, messages);

  handleUser(user);
  logout();
}

app();

async function getMessages() {
  const messages = await getJSON("/api/users/messages");
  return messages;
}
