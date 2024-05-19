import express from 'express'
import { validateCreatePlaylist } from '../../middlewares/validator/validator.js';
import { createPlayList, deletePlaylist, getAllPlayList, getPlayList, updatedPlaylist } from '../../controllers/playlist/playlist.controller.js';


const router = express.Router();

router.post("/add-playlist",validateCreatePlaylist ,createPlayList);
router.get("/playlists", getAllPlayList )
router.patch("/playlist/:playlistId",updatedPlaylist);
router.delete("/playlist/:playlistId",deletePlaylist);
router.get("/playlist/:playlistId",getPlayList);

export default router ;