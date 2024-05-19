import mongoose from "mongoose";


const historySchema = new mongoose.Schema({
    
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaItem' },
  
  }, { timestamps: true });

export default mongoose.model('MediaItem', historySchema);
