const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError= require("../utils/expressError.js");
const { listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");



const validateListing = (req, res, next) => {
  let {error}=listingSchema.validate(req.body);
 if(error){
  let errMsg=error.details.map(el=>el.message).join(",");
  throw new expressError(400,errMsg);
 }else{
  next();
 }

};

//Index route
router.get("/", wrapAsync (async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//new route
router.get("/new",(req,res)=>{
res.render("listings/new.ejs");
});

//show route
router.get("/:id", wrapAsync(async(req,res)=>{
  let {id}=req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Page not found");
  }
  const listing=await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs",{listing});
}));


//create route
router.post("/",validateListing, wrapAsync(async (req, res,next) => {
 
  const newListing = new Listing(req.body.listing); // Make sure form inputs are named listing[field]
  await newListing.save(); 
  res.redirect("/listings");
  
}));

//Edit route
router.get("/:id/edit",wrapAsync (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//Update route
router.put("/:id",validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id",wrapAsync (async (req, res) => {
    const { id } = req.params;
    try {
        await Listing.findByIdAndDelete(id);
        res.redirect("/listings"); // or send a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}));

module.exports = router;