import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createListing,
  deleteListing,
  getUserListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/user-listings/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
