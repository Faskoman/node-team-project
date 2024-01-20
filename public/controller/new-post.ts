import {
  clickSound,
  getCurrentUser,
  handleUser,
  hideDisplay,
  logout,
  redirect,
  showDisplay,
} from "./funcs.js";

async function app() {
  const user = await getCurrentUser();

  handleUser(user);
  logout();
  redirect();
  togglePayment();

  const phone = user.phone;
  const name = user.username;
  const email = user.email;

  sessionStorage.clear();

  document.forms.namedItem("newPost")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const priceInNIS = formData.get("priceInNIS");
      const monthlyRentInNIS = formData.get("monthlyRentInNIS");

      if (!priceInNIS && !monthlyRentInNIS) {
        throw new Error(
          "Either priceInNIS or monthlyRentInNIS must be provided."
        );
      } else if (
        (priceInNIS && Number(priceInNIS) <= 0) ||
        (monthlyRentInNIS && Number(monthlyRentInNIS) <= 0)
      ) {
        throw new Error("Cannot be a negative number or 0");
      }

      const body = JSON.stringify({
        title: formData.get("title"),
        type: formData.get("type"),
        neighborhood: formData.get("neighborhood"),
        city: formData.get("city"),
        bedrooms: formData.get("bedrooms"),
        floor: formData.get("floor"),
        squareMeters: formData.get("squareMeters"),
        transaction: sessionStorage.getItem("transaction"),
        cost: {
          monthlyRentInNIS: formData.get("monthlyRentInNIS"),
          priceInNIS: formData.get("priceInNIS"),
        },
        amenities: {
          hasBalcony: formData.get("hasBalcony") === "on",
          hasParking: formData.get("hasParking") === "on",
          hasAC: formData.get("hasAC") === "on",
          arePetsAllowed: formData.get("arePetsAllowed") === "on",
          isSmokingAllowed: formData.get("isSmokingAllowed") === "on",
          hasElevator: formData.get("hasElevator") === "on",
        },
        description: formData.get("description"),
        images: formData
          .get("images")
          ?.toString()
          .replaceAll(" ", "")
          .split(","),
        contactInformation: {
          name: name,
          phone: phone,
          email: email,
        },
        availabilityDate: formData.get("availabilityDate") || null,
      });

      const res = await fetch("/view/api/properties/new-post", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": body.length.toString(),
        },
      });

      if (res.status >= 400) {
        throw new Error();
      }

      await res.json();

      sessionStorage.clear();
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  });
}

app();

const labels = document.querySelectorAll("label");

labels.forEach((label) => {
  label.addEventListener("click", () => {
    clickSound();
  });
});

function togglePayment() {
  document.getElementById("Purchase")?.addEventListener("click", () => {
    showDisplay(document.getElementById("sell-price") as HTMLDivElement);
    hideDisplay(document.getElementById("rent-price") as HTMLDivElement);
    resetInputValue("monthlyRentInNIS");
    sessionStorage.setItem("transaction", "Purchase");
  });

  document.getElementById("Lease")?.addEventListener("click", () => {
    showDisplay(document.getElementById("rent-price") as HTMLDivElement);
    hideDisplay(document.getElementById("sell-price") as HTMLDivElement);
    resetInputValue("priceInNIS");
    sessionStorage.setItem("transaction", "Lease");
  });
}

function resetInputValue(input: string) {
  (document.getElementById(input) as HTMLInputElement).value = "";
}
