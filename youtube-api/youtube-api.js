require("dotenv").config({ path: __dirname + `/../.env` });
const _ = require("lodash");
const { channels } = require("./channels");
const fs = require("fs");

const youtube = require("googleapis").google.youtube({
  version: "v3",
  auth: process.env.YT_API_KEY
});

//Give channel ID and returns the Playlist ID for the channel's uploads
const getChannelUploads = async (channel) => {
  let response = await youtube.channels.list({ part: "contentDetails", id: channel });
  return response.data.items[0].contentDetails.relatedPlaylists.uploads;
};

/************************************
Retrieve all uploads from the given playlist
Returns an array of all resources, each element of the array represents an upload.*/
const getAllUploads = async (playlist) => {
  let items = []; //Will hold all the the returned resources
  let nextPage; //Holds the next page token
  //The data interested in for each resource
  let fields = "nextPageToken,items(snippet(publishedAt,channelTitle,title,thumbnails(default, medium),resourceId(videoId)))";

  do {
    try {
      //Make call to youtube api
      let response = await youtube.playlistItems.list({
        playlistId: playlist,
        part: "snippet",
        pageToken: nextPage,
        maxResults: 50,
        fields
      });
      //Capture the next page token
      nextPage = response.data.nextPageToken;
      //Make a deep clone of each snippet, since everything we need is in the snippet object. 
      //Add them to the array of items.
      items = items.concat(response.data.items.map(ele => _.cloneDeep(ele.snippet)));
    } catch (error) {
      throw error; //The promise chain is expected to catch this
    }
  } while (nextPage);

  return items;
};
/*******************************************************
Example of a single element from the returned array:
{
  snippet: {
    publishedAt: datetime  - The time at which video was published
    title: string,  - The title of the video
    thumbnails: {  - Object containing info about various available thumbnail images
      default: {
        url: string,  - The URL of the image
        width: integer,  - Width of the image
        height: integer  - Height of the image
      },
      (medium, high, standard, maxres) - same structure as default resolution obj above,
    },
    resourceId: {
      videoId: string  -The youtube videoId of the video
    }
  }
}
*******************************************************/

//Retrieve the playlist items from the provided ChannelID and write the result to a json file
const getAndWritePlaylist = (channelName) => {
  getAllUploads(channels[channelName].uploads)
    .then((res) => {
      writePlaylist(channelName, res);
    })
    .catch((err) => console.log(err));
};

//Write the given playlist to a json file. Use name to name the file name-uploads.json
const writePlaylist = (name, playlist) => {
  fs.writeFileSync(`${__dirname}/playlists/${name}-uploads.json`, JSON.stringify(playlist));
};

getAndWritePlaylist("cgpgrey");
