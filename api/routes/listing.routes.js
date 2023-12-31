import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createListing,
  deleteListing,
  getListing,
  getUserListing,
  updateListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/user-listings/:id", verifyToken, getUserListing);
router.get("/get-listing/:id", verifyToken, getListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
