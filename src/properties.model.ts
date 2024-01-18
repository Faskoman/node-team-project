import { Document, Schema, model } from "mongoose";

type venuType = "Apartment" | "House" | "Loft";

interface Property extends Document {
  title: string;
  type: venuType;
  neighborhood: string;
  city: string;
  bedrooms: number;
  floor: number;
  squareMeters: number;
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
    phoneNumber: string;
    emailAddress: string;
  };
  availabilityDate?: Date;
}

const propertySchema = new Schema<Property>({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["Apartment", "House", "Loft"],
    required: true,
    default: "Apartment",
  },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  floor: { type: Number, required: true },
  squareMeters: { type: Number, required: true },
  cost: {
    monthlyRentInNIS: { type: Number },
    priceInNIS: { type: Number },
  },
  amenities: {
    hasBalcony: { type: Boolean },
    hasParking: { type: Boolean },
    hasAC: { type: Boolean },
    arePetsAllowed: { type: Boolean },
    isSmokingAllowed: { type: Boolean },
    hasElevator: { type: Boolean },
  },
  description: { type: String, required: true },
  images: [{ type: String }],
  contactInformation: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
  },
  availabilityDate: { type: Date },
});

export const Property = model<Property>(
  "Property",
  propertySchema,
  "properties"
);
