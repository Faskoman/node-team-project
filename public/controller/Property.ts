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

export type PropertyListResult = Pick<Property, "_id" | "title" | "city" | "floor" | "neighborhood" | "bedrooms" >[];

export async function renderListItem(properties: PropertyListResult) {
  const gridBoard = document.getElementById("gridboard");
  if (!gridBoard) {
    throw new Error("grid element not in page");
  }
  
    gridBoard.innerHTML = properties.map((property) =>`<li class="grid-item"><a href="/view/property-details.html#${property._id}">${property.title}, ${property.floor}, ${property.city}, ${property.neighborhood},  ${property.bedrooms} </a></li>`).join("\n");
    
};