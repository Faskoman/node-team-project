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