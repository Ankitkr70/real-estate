import Listing from "../models/listing.model.js";
import { customError } from "../utils/error.js";
import { ObjectId } from "mongodb";

const isValidId = (id) => {
  return ObjectId.isValid(id) && String(new ObjectId(id) === id);
};
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  if (!isValidId(req.params.id)) {
    return next(customError(404, "Invalid ID"));
  }
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(customError(404, "Listing not found!"));
    }
    if (req.user.id !== listing.userRef) {
      return next(customError(401, "You can only update your own listings!"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (!isValidId(req.params.id)) {
    return next(customError(404, "Invalid ID"));
  }
  if (req.user.id !== req.params.id) {
    return next(customError(401, "User can only see own listings"));
  }
  try {
    const lisitng = await Listing.find({ userRef: req.params.id });
    res.status(200).json(lisitng);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  if (!isValidId(req.params.id)) {
    return next(customError(404, "Invalid ID"));
  }
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(customError(404, "No listing found to delete"));
  }
  if (req.user.id !== listing.userRef) {
    return next(customError(401, "User cannot delete others lisitng"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};
