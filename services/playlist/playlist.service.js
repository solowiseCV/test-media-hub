import PlayList from '../../models/playlist/playlist.model.js'

export const checkExistingPlayList = async ({name})=>{
    const existingPlayList = await PlayList.findOne({name});
    return existingPlayList
 }
 export const saveNewPlayList = async ({name,description,createdBy }) => {
   
    //create playlist
      const newPlayList = await PlayList.create({ name,description,createdBy });
      return newPlayList;
    
  };

  export const fetchAllPlaylists = async (filters) => {
    const playList = await PlayList.find(filters);
   return playList;
};


export const uptoDatePLaylist = async (playListId, updateData) => {
  const updatedPlaylist = await PlayList.findByIdAndUpdate(playListId, updateData, { new: true });
  return updatedPlaylist;
};

export const deletePlaylistById = async (playListId) => {

  await PlayList.findByIdAndDelete(playListId);
  return "PlayList deleted successfully";
};

export const getPlayListById = async (playListId) => {
  const playList = await PlayList.findById(playListId);
  return playList;
};