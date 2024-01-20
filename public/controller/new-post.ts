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

  document.forms.namedItem("newPost")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const body = JSON.stringify({
        title: formData.get("title"),
        type: formData.get("type"),
        neighborhood: formData.get("neighborhood"),
        city: formData.get("city"),
        bedrooms: formData.get("bedrooms"),
        floor: formData.get("floor"),
        squareMeters: formData.get("squareMeters"),
        transaction: formData.get("transaction"),
        cost: {
          monthlyRentInNIS: formData.get("monthlyRentInNIS"),
          priceInNIS: formData.get("priceInNIS"),
        },
        amenities: {
          hasBalcony: formData.get("hasBalcony") === "true",
          hasParking: formData.get("hasParking") === "true",
          hasAC: formData.get("hasAC") === "true",
          arePetsAllowed: formData.get("arePetsAllowed") === "true",
          isSmokingAllowed: formData.get("isSmokingAllowed") === "true",
          hasElevator: formData.get("hasElevator") === "true",
        },
        description: formData.get("description"),
        images: formData.get("images"),
        contactInformation: {
          name: user.username,
          phone: user.phone,
          email: user.email,
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
  });

  document.getElementById("Lease")?.addEventListener("click", () => {
    showDisplay(document.getElementById("rent-price") as HTMLDivElement);
    hideDisplay(document.getElementById("sell-price") as HTMLDivElement);
    resetInputValue("priceInNIS");
  });
}

function resetInputValue(input: string) {
  (document.getElementById(input) as HTMLInputElement).value = "";
}
