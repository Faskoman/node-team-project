type venuType = "Apartment" | "House" | "Loft";

type Transaction = "Lease" | "Purchase";

type Property = {
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

export async function getGridItems() {
  document.addEventListener("DOMContentLoaded", async () => {
    const gridBoard = document.getElementById("grid-board");

    if (!gridBoard) {
      throw new Error("grid element not in page");
    }

    try {
        const res = await fetch("/view/api/properties");
        const properties = await res.json();

    if (!properties) {
        throw new Error("properties is not found");
    }
  
        gridBoard.innerHTML = properties.map((property) =>`<li class="grid-item"><a href="property-details.html#${property._id}"</a></li>`).join("\n");
    } catch (error){
        console.log(error)
    }
})};

