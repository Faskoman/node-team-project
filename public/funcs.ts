export function togglePassword(formName: string): void {
  document.getElementById("toggle-password")?.addEventListener("click", (e) => {
    const input = document.forms
      .namedItem(formName)
      ?.elements.namedItem("password") as HTMLInputElement | null;

    if (!input) {
      throw new Error();
    }

    input.type = input.type === "password" ? "text" : "password";
    (e.target as HTMLSpanElement).innerText =
      input.type === "password" ? "Show" : "Hide";
  });
}

export async function redirect() {
  try {
    const user = await getJSON("/api/auth/currentUser");
    const currentWindowLocation = window.location.href;

    if (!user && window.location.href.includes("newPost.html")) {
      // update when creating add post form
      window.location.replace("/login.html");
    } else if (user && isEntryPage(currentWindowLocation)) {
      window.location.replace("/");
    }
  } catch (error) {
    console.error("Error during redirect:", error);
  }
}

export async function getJSON(path: string) {
  const res = await fetch(path);
  return await res.json();
}

function isEntryPage(location: string): boolean {
  return location.includes("login.html") || location.includes("register.html");
}

export function handleUser(user: any) {
  const userDiv = document.getElementById("username");

  if (!user) {
    return;
  }

  document.body.classList.add("logged-in");

  if (!userDiv) {
    return;
  }

  userDiv.textContent = user.username;
}

export async function getCurrentUser() {
  const user = await getJSON("/api/auth/currentUser");
  return user;
}

export function logout() {
  document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "same-origin",
      });

      new Promise<void>((resolve) => {
        window.location.href = "/api/auth/logout";
        resolve();
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  });
}

export function addNumberSuffix(number: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder10 = number % 10;
  const remainder100 = number % 100;

  return (
    number +
    (remainder10 === 1 && remainder100 !== 11
      ? suffixes[1]
      : remainder10 === 2 && remainder100 !== 12
      ? suffixes[2]
      : remainder10 === 3 && remainder100 !== 13
      ? suffixes[3]
      : suffixes[0])
  );
}
