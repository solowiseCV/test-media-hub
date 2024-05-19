import MoviePlaylist from '../../models/playlist/moviePlaylist.model.js'

export const checkExistingPlayList = async ({name})=>{
    const existingPlayList = await MoviePlaylist.findOne({name});
    return existingPlayList
 }
 export const saveNewPlayList = async ({name,description,createdBy,movieFile }) => {
   
    //create playlist
      const newPlayList = await PlayList.create({ name,description,createdBy,movieFile });
      return newPlayList;
    
  };

  export const fetchAllPlaylists = async (filters) => {
    const playList = await MoviePlaylist.find(filters);
   return playList;
};


export const uptoDatePLaylist = async (playListId, updateData) => {
  const updatedPlaylist = await MoviePlaylist.findByIdAndUpdate(playListId, updateData, { new: true });
  return updatedPlaylist;
};

export const deletePlaylistById = async (playListId) => {

  await MoviePlaylist.findByIdAndDelete(playListId);
  return "PlayList deleted successfully";
};

export const getPlayListById = async (playListId) => {
  const playList = await MoviePlaylist.findById(playListId);
  return playList;
};