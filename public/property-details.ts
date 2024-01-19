import { getPropertyDetails } from "./Property.js";
import { getJSON, handleUser, logout } from "./funcs.js";

async function app() {
  const [user, property] = await Promise.all([
    getJSON("/api/auth/currentUser"),
    getPropertyDetails(window.location.hash.slice(1)),
  ]);

  console.log(user, property);

  handleUser(user);
  logout();

  renderPropertyField("title")
  renderPropertyField("type")
  renderPropertyField("neighborhood")
  renderPropertyField("city")
  renderPropertyField("bedrooms")
  renderPropertyField("floor")
  renderPropertyField("squareMeters")
  renderPropertyField("description")

  function renderPropertyField(field: keyof typeof property) {
    const details = document.getElementById(`property-${field}`);

    if (!details) {
      throw new Error(`${field} wasn't found!`);
    }

    details.innerText = property[field]!.toString();
  }
}

app();
