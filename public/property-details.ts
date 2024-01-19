import { getPropertyDetails } from "./Property.js";
import { addNumberSuffix, getJSON, handleUser, logout } from "./funcs.js";

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
  renderTransaction();
  renderContactInfo("name");
  renderContactInfo("phone");

  if (property.floor === 0) {
    document.getElementById("property-floor")!.innerText = "Ground";
  } else {
    const formattedFloor = addNumberSuffix(property.floor);
    document.getElementById("property-floor")!.innerText = formattedFloor;
  }

  renderPropertyField("squareMeters");
  renderPropertyField("description");
  renderAmenity("arePetsAllowed");
  renderAmenity("hasAC");
  renderAmenity("hasBalcony");
  renderAmenity("hasElevator");
  renderAmenity("hasParking");
  renderAmenity("isSmokingAllowed");

  function renderTransaction() {
    const transactionSpan = document.getElementById("property-transaction");

    if (transactionSpan) {
      const leaseText = "For Lease";
      const saleText = "For Sale";

      transactionSpan.innerText =
        property.transaction === "Lease" ? leaseText : saleText;
    }

    const propertyCost = document.getElementById("property-cost");

    if (propertyCost) {
      propertyCost.innerText =
        property.transaction === "Lease"
          ? (property.cost.monthlyRentInNIS ?? "").toLocaleString()
          : (property.cost.priceInNIS ?? "").toLocaleString();
    }
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

  function renderContactInfo(
    contactField: keyof typeof property.contactInformation
  ) {
    const contactSpan = document.getElementById(`contact-${contactField}`);

    if (!contactSpan) {
      throw new Error(`contact ${contactField} not found`);
    }

    contactSpan.innerText =
      property.contactInformation[contactField].toString();
  }
}

app();
