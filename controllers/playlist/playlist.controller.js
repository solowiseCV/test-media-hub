import asyncHandler from 'express-async-handler';
import { deletePlaylistById, fetchAllPlaylists, getPlayListById, saveNewPlayList, uptoDatePLaylist } from '../../services/playlist/playlist.service.js';
import cloudinary from '../../configs/cloudinary.js'

// Create playList
export const createPlayList= asyncHandler(async (req, res) => {
  const { name, description, createdBy  } = req.body;
 const {audioFile} = req.files;

  //checking 
  if (!name || !description || !createdBy || !audioFile) {
    res.status(400);
    throw new Error("Fill all the fields");
  }

  //checking for number of charaters in name
  if(name.length < 5) {
    res.status(400);
    throw new Error("Name field must be atleast 5 charaters")
  }

  //Check if playList already exist with same name field
  const existsPlayList = await checkExistingPlayList({name})
  if(existsPlayList){
    res.status(409);
    throw new Error("Playlist already exist with same name")
  }

  //create playlist
  try {
    let uploadedResponse;
    if (audioFile) {
      uploadedResponse = await cloudinary.uploader.upload(audioFile.path, {
        resource_type: "raw",
        upload_preset: "media-hub",
      });
    }

    if (uploadedResponse) {
        const newPlayList = await saveNewPlayList({ 
            name,
             description,
             createdBy,
            audioFile:uploadedResponse.secure_url });
          res.status(201).json(newPlayList);
    }

  } catch (error) {
    res.status(500);
    throw new Error("Invalid PlayList data");
  }

});


// GET endpoint for fetching all playlist with optional filters
export const getAllPlayList = asyncHandler(async (req, res) => {
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
export const updatedPlaylist = asyncHandler(async (req, res) => {
  try {
    const updatedPlaylist = await uptoDatePLaylist(req.params.playListId, req.body);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Delete playlist
export const deletePlaylist = asyncHandler(async (req, res) => {
  try {
    const message = await deletePlaylistById(req.params.playlistId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Get a single playlist using its id
export const getPlayList = asyncHandler(async (req, res) => {
  try {
    const playList = await getPlayListById(req.params.playListId);
    if(!playList){
      res.status(404);
      throw new Error("Playlist not found");
    }
    res.status(200).json(playList);

  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});
