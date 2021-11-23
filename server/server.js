const express = require("express");
const app = express();
const cors = require("cors");
const { channels, channelNames } = require("./playlists/allPlaylists.js");

app.use(cors());
app.use(express.json());

//Generate a random number for [0, limit)
const getRandomNum = (limit) => {
  return Math.floor(Math.random() * limit);
};

const generateRandomPlaylist = (selectedChannels = channelNames, currentPlaylist) => {
  let newPlaylist = [];
  for (let i = 0; i < 25; i++) {
    //First, pick a channel
    let ch = selectedChannels[getRandomNum(selectedChannels.length)];
    //Pick a video from that channel
    let attempts = 0;
    let vid;
    //Rudimentary method of avoiding repeats.
    do {
      vid = channels[ch][getRandomNum(channels[ch].length)];
      attempts++;
    } while (!newPlaylist.every((ele) => ele.resourceId.videoId !== vid.resourceId.videoId) || attempts < 10);

    newPlaylist.push(vid);
  }
  return newPlaylist;
};

// const verifyRequest = () => {
//   return (req, res, next) => {
//     if (!req.body.selectedChannels || !req.body.currentPlaylist) {
//       return res.status(400).send("Missing request body data");
//     } else {
//       next();
//     }
//   }
// }

const verifyGetRequest = () => {
  return (req, res, next) => {
    if (!req.query.selectedChannels) {
      return res.status(400).send("Missing request query data");
    }

    let reqArr = req.query.selectedChannels.split(" ");
    if (reqArr.every((ele) => channelNames.includes(ele))) return next();

    return res.status(400).send("Query contains invalid channel names");
  };
};

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/getPlaylist", (req, res) => {
  let playlist = generateRandomPlaylist();
  res.status(200).json(playlist);
});

app.get("/api/getCustomPlaylist", verifyGetRequest(), (req, res) => {
  let reqArr = req.query.selectedChannels.split(" ");
  let playlist = generateRandomPlaylist(reqArr);
  res.status(200).json(playlist);
});

// app.post("/api/getPlaylist", verifyRequest(), (req, res) => {
//   let newPlaylist = generateRandomPlaylist(req.body.selectedChannels, req.body.currentPlaylist);
//   res.status(200).json(newPlaylist);
// })

app.all("*", (req, res) => {
  res.send("Hello. I have nothing for you at this location.");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
