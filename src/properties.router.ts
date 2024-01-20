import { Router } from "express";
import { Property } from "./properties.model";

export const router = Router();

router.param("propertyId", async (req, res, next, propertyId) => {
  try {
    req.property = await Property.findById(propertyId);
    if (!req.property) {
      res.status(404).send(`property with id ${propertyId} not found.`);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
});

router.get("/:propertyId", async (req, res) => {
  try {
    if (!req.property) {
      res.status(404).send(`property not found.`);
      return;
    }

    res.status(200).json(req.property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/new-post", async (req, res, next) => {
  try {
    const {
      title,
      type,
      neighborhood,
      city,
      bedrooms,
      floor,
      squareMeters,
      transaction,
      cost,
      amenities,
      description,
      images,
      availabilityDate,
    } = req.body;

    if (
      !title ||
      !type ||
      !neighborhood ||
      !city ||
      !bedrooms ||
      !floor ||
      !squareMeters ||
      !transaction ||
      !cost ||
      !amenities ||
      !description ||
      !images ||
      !availabilityDate
    ) {
      res.status(400);
      res.send("Must provide all fields of the property...");
      return;
    }

    const property = await Property.create({
      title,
      type,
      neighborhood,
      city,
      bedrooms,
      floor,
      squareMeters,
      transaction,
      cost,
      amenities,
      description,
      images,
      availabilityDate,
    });

    console.log(property);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
