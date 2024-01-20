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
    cost: { monthlyRentInNIS?: number; priceInNIS?: number; };
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

export async function getPropertyDetails(propertyId: string): Promise<Property> {
    const res = await fetch(`api/properties/${propertyId}`);

    return res.json();
}

