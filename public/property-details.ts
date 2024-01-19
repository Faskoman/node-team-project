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

  renderPropertyField("title");
  renderPropertyField("type");
  renderPropertyField("neighborhood");
  renderPropertyField("city");
  renderPropertyField("bedrooms");
  if (property.floor === 0) {
    document.getElementById("property-floor")!.innerText = "Ground";
  } else {
    renderPropertyField("floor");
  }
  renderPropertyField("squareMeters");
  renderPropertyField("description");
  renderAmenity("arePetsAllowed");
  renderAmenity("hasAC");
  renderAmenity("hasBalcony");
  renderAmenity("hasElevator");
  renderAmenity("hasParking");
  renderAmenity("isSmokingAllowed");

  const transactionSpan = document.getElementById("property-transaction");

  if (transactionSpan) {
    property.transaction === "Lease"
      ? (transactionSpan.innerText = "Available for Lease")
      : (transactionSpan.innerText = "For Sale");
  }

  function renderPropertyField(field: keyof typeof property) {
    const details = document.getElementById(`property-${field}`);

    if (!details) {
      throw new Error(`${field} wasn't found!`);
    }

    details.innerText = property[field]!.toString();
  }

  function renderAmenity(amenityField: keyof typeof property.amenities) {
    const amenity = document.getElementById(`property-${amenityField}`);

    if (!amenity) {
      throw new Error(`Amenity ${amenity} not found`);
    }

    if (property.amenities[amenityField] === true) {
      amenity.classList.add("checked-amenity");
    }
  }
}

app();
