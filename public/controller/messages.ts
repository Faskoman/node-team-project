import {
    formatDate,
  getCurrentUser,
  getJSON,
  handleUser,
  logout,
  newPostLink,
} from "./funcs.js";

async function app() {
  const [user, messages] = await Promise.all([
    await getCurrentUser(),
    await getMessages(),
  ]);

  console.log(user, messages);

  handleUser(user);
  logout();
  newPostLink();
  renderMessages();

  async function renderMessages() {
    const messagesContainer = document.getElementById("messages-container");

    if (!messagesContainer) {
      throw new Error("messages container not found");
    }

    messagesContainer.innerHTML = messages
      .map(
        (message: any, i: number) => `
    <div class="message-box">
                <label for="message-${i}" class="message-box__label">
                    <span class="message-box__label__content">${message.content}</span>
                    <span>${message.author.name}</span>
                    <span class="message-box__label__date">${formatDate(message.creationDate)}</span>
                </label>
                <input type="radio" name="message" id="message-${i}">
                <div class="message">${message.content}
                </div></input>
            </div>`
      )
      .join("\n");
  }
}

app();

async function getMessages() {
  const messages = await getJSON("/api/users/messages");
  return messages;
}
