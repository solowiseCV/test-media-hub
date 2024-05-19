import mongoose from "mongoose";


const mediaItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String },
    releaseDate :{type : Date},
    platform : {type : String},
  
  }, { timestamps: true });

export default mongoose.model('MediaItem', mediaItemSchema);
