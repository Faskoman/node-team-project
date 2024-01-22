import { getJSON } from "./funcs";

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

export type PropertyListResult = Pick<Property, "_id" | "title" | "city" | "floor" | "neighborhood" | "bedrooms" | "squareMeters" | "cost">[];

export async function renderListItem(properties: PropertyListResult) {
  const gridBoard = document.getElementById("gridboard");
  if (!gridBoard) {
    throw new Error("grid element not in page");
  }
  //`<li class="grid-item"><a href="/view/property-details.html#${property._id}">${property.title}, ${property.floor}, ${property.city}, ${property.neighborhood},  ${property.bedrooms} </a></li>`);
  gridBoard.innerHTML = properties.map((property) =>`<li class="grid-item"><a href="/view/property-details.html#${property._id}"> <img src="" alt=""> <div>${property.title}, ${property.city}, ${property.neighborhood},</div> <div class="item-info">${property.floor},  ${property.bedrooms}, ${property.squareMeters} </div><div>${property.cost}</div></a></li>`).join("\n")
    
};