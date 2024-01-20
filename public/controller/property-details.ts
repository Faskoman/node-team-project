import { getPropertyDetails } from "./Property.js";
import {
  addNumberSuffix,
  getCurrentUser,
  handleUser,
  logout,
  toggleDisplay,
} from "./funcs.js";

async function app() {
  const [user, property] = await Promise.all([
    getCurrentUser(),
    getPropertyDetails(window.location.hash.slice(1)),
  ]);

  sessionStorage.setItem('lastViewed', JSON.stringify(window.location.hash));

  console.log(user, property);

  handleUser(user);
  logout();

  renderPictures();
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

  function renderPictures() {
    const picturesContainer = document.getElementById("property-pictures");

    if (!picturesContainer) {
      throw new Error(`Pictures container not found`);
    }

    picturesContainer.innerHTML = "";

    for (let i = 0; i < property.images.length; i++) {
      const pictureElement = document.createElement("img");
      pictureElement.src = property.images[i];
      pictureElement.alt = "property picture";
      pictureElement.classList.add(`property-picture-${i + 1}`);

      if (property.images.length === 1) {
        pictureElement.classList.add("only-one-picture");
      } else if (property.images.length === 2 && i === 1) {
        pictureElement.classList.add("only-two-pictures");
      }

      if (i === 3) {
        return;
      }

      picturesContainer.appendChild(pictureElement);
    }
  }

  const contactDetailsButton = document.getElementById(
    "contact-details-button"
  ) as HTMLButtonElement;
  const contactInfo = document.getElementById("contact-info") as HTMLDivElement;

  contactDetailsButton.addEventListener("click", () => {
    contactDetailsButton.classList.add("fade-out");
    setTimeout(() => {
      toggleDisplay(contactDetailsButton);
      contactInfo.classList.add("fade-in");
      toggleDisplay(contactInfo);
    }, 300);
  });
}

app();
