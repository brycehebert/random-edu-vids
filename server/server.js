const express = require("express");
const app = express();
const cors = require("cors")
const {channels, channelNames} = require("./playlists/allPlaylists.js");

app.use(cors());
app.use(express.json());

const getRandomNum = (limit) => {
  return Math.floor(Math.random() * limit);
}

const generateRandomPlaylist = (selectedChannels, currentPlaylist) => {
  let newPlaylist = [];
  
  for (let i = 0 ; i < 25; i++) {
    //First, pick a channel
    let ch = selectedChannels[getRandomNum(selectedChannels.length)];
    //Pick a video from that channel
    let attempts = 0;
    let vid;
    //Rudimentary method of avoiding repeats.
    do {
      vid = channels[ch][getRandomNum(channels[ch].length)];
      attempts++
    } while (newPlaylist.every(ele => ele.resourceId.videoId !== vid.resourceId.videoId ) && attempts < 10);

    newPlaylist.push(vid);
  }
  return newPlaylist;
}

const verifyRequest = () => {
  return (req, res, next) => {
    if (!req.body.selectedChannels || !req.body.currentPlaylist) {
      return res.status(400).send("Missing request body data");
    } else {
      next();
    }
  }
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/api/getPlaylist", verifyRequest(), (req, res) => {
  let newPlaylist = generateRandomPlaylist(req.body.selectedChannels, req.body.currentPlaylist);
  res.status(200).json(newPlaylist);
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
