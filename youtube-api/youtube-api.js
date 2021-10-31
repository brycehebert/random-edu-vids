require("dotenv").config({ path: "../.env" });
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
  let response;
  let nextPage; //Holds the next page token
  //The data interested in for each resource
  let fields = "nextPageToken,items(snippet(publishedAt,title,thumbnails,resourceId(videoId)))";

  do {
    try {
      //Make call to youtube api
      response = await youtube.playlistItems.list({
        playlistId: playlist,
        part: "snippet",
        pageToken: nextPage,
        maxResults: 50,
        fields
      });
      //Capture the next page token
      nextPage = response.data.nextPageToken;
      //Add the returned playlist resource to the array of all the uploads currently returned.
      items = items.concat(response.data.items);
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
    publishedAt: datetime
    title: string,
    thumbnails: {
      default: {
        url: string,
        width: integer,
        height: integer
      },
      (medium, high, standard, maxres) - same structure as default resolution obj above),
    },
    resourceId: {
      videoId: string
    }
  }
}
*******************************************************/

//Retrieve the playlist items from the provided ChannelID and write the result to a json file
const writeNamedUploads = (channelName) => {
  getAllUploads(channels[channelName].uploads)
    .then((res) => {
      console.log(`Completed. Returned ${res.length} items.`);
      fs.writeFileSync(`${channelName}-uploads.json`, JSON.stringify(res));
    })
    .catch((err) => console.log(err));
};

//writeNamedUploads("cgpgrey");
