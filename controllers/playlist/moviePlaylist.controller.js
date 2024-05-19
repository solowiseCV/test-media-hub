import asyncHandler from 'express-async-handler';
import { deletePlaylistById, fetchAllPlaylists, getPlayListById, saveNewPlayList, uptoDatePLaylist } from '../../services/playlist/playlist.service.js';
import cloudinary from '../../configs/cloudinary.js'

// Create playList
export const createMoviePlayList= asyncHandler(async (req, res) => {
  const { name, description, createdBy  } = req.body;
const {movieFile} = req.files
  //checking 
  if (!name || !description || !createdBy || !movieFile) {
    res.status(400);
    throw new Error("Fill all the fields");
  }

  //checking for number of charaters in name
  if(name.length < 5) {
    res.status(400);
    throw new Error("Name field must be atleast 5 charaters")
  }

  //Check if playList already exist with same name field
  const existsMoviePlayList = await checkExistingPlayList({name})
  if(existsMoviePlayList){
    res.status(409);
    throw new Error("Playlist already exist with same name")
  }

  //create playlist
  try {
    let uploadedResponse;
    if (movieFile) {
      uploadedResponse = await cloudinary.uploader.upload(audioFile.path, {
        resource_type: "video",
        upload_preset: "media-hub",
      });
    }
    
    if (uploadedResponse) {
        const newMoviePlayList = await saveNewPlayList({ 
            name,
             description,
             createdBy ,
            movieFile: uploadedResponse.secure_url});
          res.status(201).json(newMoviePlayList);
    }
}
   catch (error) {
    res.status(500);
    throw new Error("Invalid PlayList data");
  }

});


// GET endpoint for fetching all playlist with optional filters
export const getAllMoviePlayList = asyncHandler(async (req, res) => {
  const q = req.query;

  try {
    const filters = {
      ...(q.name && { name: q.name }),
      ...(q.description && { description: q.description }),
      ...(q.createdBy && { createdBy: q.createdBy }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } })
    };
    const playList = await fetchAllPlaylists(filters);
    res.status(200).json(playList);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});


// Update playlist
export const updatedMoviePlaylist = asyncHandler(async (req, res) => {
  try {
    const updatedPlaylist = await uptoDatePLaylist(req.params.playListId, req.body);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Delete playlist
export const deleteMoviePlaylist = asyncHandler(async (req, res) => {
  try {
    const message = await deletePlaylistById(req.params.playlistId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Get a single playlist using its id
export const getMoviePlayList = asyncHandler(async (req, res) => {
  try {
    const moviePlayList = await getPlayListById(req.params.playListId);
    if(!moviePlayList){
      res.status(404);
      throw new Error("Playlist not found");
    }
    res.status(200).json(playList);

  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});
