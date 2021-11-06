const channelNames = ["cgpgrey", "markrober", "nilered", "realengineering", "smartereveryday", "veritasium", "vsauce"];
module.exports.channelNames = channelNames;
module.exports.channels = {};

channelNames.forEach(ele => {
  module.exports[ele] = require(`./${ele}-uploads.js`);
  module.exports.channels[ele] = require(`./${ele}-uploads.js`)[ele];
});