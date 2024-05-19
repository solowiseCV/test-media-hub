import mongoose from ('mongoose');

const moviePlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movieFile: {type: String},
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('MoviePlaylist', moviePlaylistSchema);
