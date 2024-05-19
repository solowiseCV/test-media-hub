 import asyncHandler from 'express-async-handler'
 import spotifyApi from '../../../configs/spotify.js';

 // Define the scopes for authorization; these are the permissions we ask from the user.
  export const spotifyLogin = asyncHandler(async ()=>{
    const scopes = [
        'user-read-private', 
        'user-read-email', 
        'user-read-playback-state', 
        'user-modify-playback-state',
        'playlist-read-private', 
        'playlist-read-collaborative'
    ];
    // Redirect the client to Spotify's authorization page with the defined scopes.
    res.redirect(spotifyApi.createAuthorizeURL(scopes))
 });

//Route handler for the callback endpoint after the user has logged in.
export const callBack = asyncHandler(async(req, res) => {
    
    // Extract the error, code, and state from the query parameters.
    const error = req.query.error;
    const code = req.query.code;

    // If there is an error, log it and send a response to the user.
    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    // Exchange the code for an access token and a refresh token.
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];

        // Set the access token and refresh token on the Spotify API object.
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        // Logging tokens can be a security risk; this should be avoided in production.
        console.log('The access token is ' + accessToken);
        console.log('The refresh token is ' + refreshToken);

        // Send a success message to the user.
        res.send('Login successful! You can now use the /search and /play endpoints.');

        // Refresh the access token periodically before it expires.
        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body['access_token'];
            spotifyApi.setAccessToken(accessTokenRefreshed);
        }, expiresIn / 2 * 1000); // Refresh halfway before expiration.

    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.send('Error getting tokens');
    });
});

// Route handler for the search endpoint.
export const getSearch = asyncHandler(async(req, res) => {
    // Extract the search query parameter.
    const { q } = req.query;

    // Make a call to Spotify's search API with the provided query.
    spotifyApi.searchTracks(q).then(searchData => {
        // Extract the URI of the first track from the search results.
        const trackUri = searchData.body.tracks.items[0].uri;
        // Send the track URI back to the client.
        res.send({ uri: trackUri });
    }).catch(err => {
        console.error('Search Error:', err);
        res.send('Error occurred during search');
    });
});

export const getMyRecentlyPlayedTracks = asyncHandler(async(req, res) => {
    spotifyApi.getMyRecentlyPlayedTracks()
    .then(data => {
        res.send(data.body.items);
    }).catch(err => {
        console.error('Error fetching recently played tracks:', err);
        res.send('Error occurred fetching recently played tracks');
    });
});



export const getSpotifyPlayList = asyncHandler(async (req, res) => {
    spotifyApi.getUserPlaylists()
    .then(data => {
        res.send(data.body.items);
    }).catch(err => {
        console.error('Error fetching playlists:', err);
        res.send('Error occurred fetching playlists');
    });
});

export const getPlaylistTracks = asyncHandler(async (req, res) => {
    const { playlistId } = req.query;

    if (!playlistId) {
        res.send('Playlist ID is required');
        return;
    }

    spotifyApi.getPlaylistTracks(playlistId)
    .then(data => {
        res.send(data.body.items);
    }).catch(err => {
        console.error('Error fetching playlist tracks:', err);
        res.send('Error occurred fetching playlist tracks');
    });
});


// Route handler for the play endpoint.
export const play = asyncHandler(async(req, res) => {
    // Extract the track URI from the query parameters.
    const { uri } = req.query;

    // Send a request to Spotify to start playback of the track with the given URI.
    spotifyApi.play({ uris: [uri] }).then(() => {
        res.send('Playback started');
    }).catch(err => {
        console.error('Play Error:', err);
        res.send('Error occurred during playback');
    });
});

