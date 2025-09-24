const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
  image: {
  filename: {
    type: String,
    default: "listingimage",
  },
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1598926955088-29ce45f35d5a?...",
  },
},


    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;