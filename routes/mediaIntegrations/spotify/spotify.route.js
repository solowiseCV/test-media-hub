import express from 'express'
import { callBack, getMyRecentlyPlayedTracks, getPlaylistTracks, getSearch, play, spotifyLogin } from '../../../controllers/mediaIntegration/spotify/spotify.controller.js';
import { getPlayList } from '../../../controllers/playlist/playlist.controller.js';
import authenticate from '../../../middlewares/authentication/auth.middle.js';


const router = express.Router();
router.get("/login",authenticate, spotifyLogin);
router.get("/callback",authenticate, callBack);
router.get("/search",authenticate, getSearch);
router.get("/search",authenticate, getPlayList);
router.get("/search",authenticate, getPlaylistTracks);
router.get("/search",authenticate, getMyRecentlyPlayedTracks);
router.get("/play", authenticate, play);

export default router;