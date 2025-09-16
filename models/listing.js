const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
       set:(v)=>v===""?"https://www.agoda.com/sunset-beach-club-hotel/hotel/koh-phangan-th.html?cid=1844104&ds=H5to3%2FWrfoskiBiU":v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;