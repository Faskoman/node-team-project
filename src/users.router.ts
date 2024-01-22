import { Router } from "express";
import { sessionCookieName } from ".";
import { User } from "./users.model";

export const router = Router();

router.get("/currentUser", async (req, res, next) => {
    try {
      const user = await getUser(req.signedCookies[sessionCookieName]);
  
      res.status(200);
      res.json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  router.get("/logout", (_, res) => {
    res.cookie("userId", "", { expires: new Date(0) });
    res.send("logged-out");
  });
  

  
  async function getUser(userId?: string) {
    if (!userId) {
      return null;
    }
  
    const user = await User.findById(userId);
  
    if (!user) {
      throw new Error();
    }
  
    return user;
  }
  
