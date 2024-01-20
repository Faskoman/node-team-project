import {
  clickSound,
  getCurrentUser,
  handleUser,
  logout,
  redirect,
} from "./funcs.js";

async function app() {
  const user = await getCurrentUser();

  handleUser(user);
  logout();
  redirect();
}

app();

const labels = document.querySelectorAll("label");

labels.forEach((label) => {
  label.addEventListener("click", () => {
    clickSound();
  });
});
