import { getCurrentUser, getJSON, handleUser, logout, newPostLink } from "./funcs.js";

async function app() {
  const [user, messages] = await Promise.all([
    await getCurrentUser(),
    await getMessages(),
  ]);

  console.log(user, messages);

  handleUser(user);
  logout();
  newPostLink();
}

app();

async function getMessages() {
  const messages = await getJSON("/api/users/messages");
  return messages;
}
