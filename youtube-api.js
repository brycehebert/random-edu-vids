require("dotenv").config()

const youtube = require("googleapis").google.youtube({
  version: "v3",
  auth: process.env.YT_API_KEY
});

const channels = {
  cgpgrey: {
    channelID: "UC2C_jShtL725hvbm1arSV9w",
    uploads: "UU2C_jShtL725hvbm1arSV9w"
  },
  vsauce: {
    channelID: "UC6nSFpj9HTCZ5t-N3Rm3-HA",
    uploads: "UU6nSFpj9HTCZ5t-N3Rm3-HA"
  },
  veritasium: {
    channelID: "UCHnyfMqiRRG1u-2MsSQLbXA",
    uploads: "UUHnyfMqiRRG1u-2MsSQLbXA"
  },
  smartereveryday: {
    channelID: "UC6107grRI4m0o2-emgoDnAA",
    uploads: "UU6107grRI4m0o2-emgoDnAA"
  },
  markrober: {
    channelID: "UCY1kMZp36IQSyNx_9h4mpCg",
    uploads: "UUY1kMZp36IQSyNx_9h4mpCg"
  },
  nilered: {
    channelID: "UCFhXFikryT4aFcLkLw2LBLA",
    uploads: "UUFhXFikryT4aFcLkLw2LBLA"
  },
  realengineering: {
    channelID: "UCR1IuLEqb6UEA_zQ81kwXfg",
    uploads: "UUR1IuLEqb6UEA_zQ81kwXfg"
  }
};

//Give channel ID and returns the Playlist ID for the channel's uploads
const getChannelUploads = async (channel) => {
  let response = await youtube.channels.list({part: "contentDetails", id: channel});
  return response.data.items[0].contentDetails.relatedPlaylists.uploads;
}

module.exports = {
  channels
}