import mongoose from "mongoose";


const mediaItemSchema = new mongoose.Schema({
   
    followingUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    followedUserId:{type : mongoose.Schema.Types.ObjectId, ref : 'User'},
  
  }, { timestamps: true });

export default mongoose.model('MediaItem', mediaItemSchema);
