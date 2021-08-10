let config;
  
  try {
    config = require("../../config.json");
  } catch (error) {
    config = null;
  }

exports.GIPHY_API_KEY = config.GIPHY_API_KEY
exports.TENOR_API_KEY = config.TENOR_API_KEY
exports.PREFIX = config.PREFIX;
exports.YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
exports.MONGOOSEKEY = config.MONGOOSEKEY;
exports.BS_API_KEY = config.BS_API_KEY;
exports.SOUNDCLOUD_CLIENT_ID = config.SOUNDCLOUD_CLIENT_ID;
exports.TWITCH_TOKEN = config.TWITCH_TOKEN;
exports.TWITCH_CLIENT_ID = config.TWITCH_CLIENT_ID;
exports.DEFAULT_VOLUME = config.DEFAULT_VOLUME;
exports.LECHSBOTTKEY = config.LECHSBOTTKEY;
exports.OWNER1 = config.OWNER1;
exports.OWNER2 = config.OWNER2;