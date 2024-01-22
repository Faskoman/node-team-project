type venuType = "Apartment" | "House" | "Loft";

type Transaction = "Lease" | "Purchase";

type Property = {
  _id: string;
  title: string;
  type: venuType;
  neighborhood: string;
  city: string;
  bedrooms: number;
  floor: number;
  squareMeters: number;
  transaction: Transaction;
  cost: { monthlyRentInNIS?: number; priceInNIS?: number };
  amenities: {
    hasBalcony: boolean;
    hasParking: boolean;
    hasAC: boolean;
    arePetsAllowed: boolean;
    isSmokingAllowed: boolean;
    hasElevator: boolean;
  };
  description: string;
  images: string[];
  contactInformation: {
    name: string;
    phone: string;
    email: string;
  };
  availabilityDate?: Date;
};

export async function getPropertyDetails(
  propertyId: string
): Promise<Property> {
  const res = await fetch(`api/properties/${propertyId}`);

  return res.json();
}

export async function getProperties() {
  const res = await fetch("/view/api/properties");
  const properties = await res.json();
  return properties;
}

export type PropertyListResult = Pick<Property, "_id" | "title" | "city" | "floor" | "neighborhood" | "bedrooms" | "squareMeters" | "cost" | "images" | "transaction">[];

export async function renderListItem(properties: PropertyListResult) {
  const gridBoard = document.getElementById("gridboard");
  if (!gridBoard) {
    throw new Error("grid element not in page");
  }

  gridBoard.innerHTML = properties.map((property) => `
    <li class="grid-item">
      <a class="grid-item__link" href="/view/property-details.html#${property._id}">
        <img class="grid-item__img" src="${property.images[0]}" alt="">
        <div class="grid-item__title"><div>${property.title}</div><div> ${property.city}</div> <div>${property.neighborhood}</div></div>
        <div class="grid-item__info"><div>floor: ${property.floor}</div> <div>rooms: ${property.bedrooms}</div><div>m²:${property.squareMeters}</div></div>
        <div class="grid-item__price" id="item-price-${property._id}"></div>
      </a>
    </li>`).join("\n");

  function priceCheck() {
    properties.forEach((property) => {
      const checkedPrice = property.transaction === "Lease"
        ? `${property.cost.monthlyRentInNIS} per month`
        : `Purchase price: ${property.cost.priceInNIS} ₪`;

      const itemPrice = document.getElementById(`item-price-${property._id}`);
      if (itemPrice) {
        const priceElement = document.createElement("div");
        priceElement.textContent = checkedPrice;
        itemPrice.appendChild(priceElement);
      }
    });
  }

  priceCheck();
}

export async function getproperty(search?: string): Promise<PropertyListResult> {
  const query = search ? `?search=${search}` : "";
  const res = await fetch(`/view/api/properties${query}`);

  return res.json();
}

