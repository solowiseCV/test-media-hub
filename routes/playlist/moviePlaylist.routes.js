import express from 'express'
import { validateCreatePlaylist } from '../../middlewares/validator/validator.js';
import { createMoviePlayList, deleteMoviePlaylist, getAllMoviePlayList, getMoviePlayList, updatedMoviePlaylist } from '../../controllers/playlist/moviePlaylist.controller.js';


const router = express.Router();

router.post("/add-playlist",validateCreatePlaylist ,createMoviePlayList);
router.get("/playlists", getAllMoviePlayList )
router.patch("/playlist/:playlistId",updatedMoviePlaylist);
router.delete("/playlist/:playlistId",deleteMoviePlaylist);
router.get("/playlist/:playlistId",getMoviePlayList);

export default router ;