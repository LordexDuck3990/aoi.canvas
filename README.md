
# Aoi Canvas

Aoi Canvas is a package that allows you to utilize canvas functions with Aoi.js Bot.

Docs: [link](https://aoicanvas.vercel.app/)

## Setup

1. Install `aoi.canvas` package:
```shell
npm install aoi.canvas
```

2. Import the `aoi.canvas` library into your project:
```javascript
const aoicanvas = require("aoi.canvas");
```

3. Load Aoi Canvas with the required parameters:
```javascript
aoicanvas.load({
  client: client, // Aoi.js Bot object.
  Util: Util, // To make aoi.canvas parser work. ($sendMessage, $channelSendMessage, $interactionReply, etc)
  DownloadFolder: "./folder/", // Folder for $downloadCanvas, optional.
  ErrorsType: "console" // AoiCanva errors type, optional. (console/message/none)
});
```

4. You are ready to use Aoi Canvas with your Aoi.js Bot!

## Example

```javascript
const { AoiClient, Util } = require("aoi.js");
const aoicanvas = require("aoi.canvas");

const client = new AoiClient({
  token: "Discord Bot Token",
  prefix: "Discord Bot Prefix",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    tables: ["main"],
    path: "./database/",
    extraOptions: {
      dbType: "KeyValue",
    },
  },
});

aoicanvas.load({
    client: client,
    Util: Util,
    DownloadFolder: "./aoicanvas/",
    ErrorsType: "console"
});

// Ping Command Example
client.command({
    name: "ping",
    code: `Pong! $pingms`
});

// Pro Avatar Command Example
client.command({
    name: "pro",
    code: `
    $sendCanvas[pro]
    $drawText[pro;Pro;225;450]
    $setShadow[pro;20]
    $canvasColor[pro;#FFFFFF;shadow]
    $font[pro;50px Arial]
    $canvasColor[pro;#000000]
    $drawImage[pro;avatar;0;0;512;512]
    $loadImage[pro;avatar;url;$nonEscape[$authorAvatar]]
    $createCanvas[pro;512;512]
    `
});
```

---

Remember to follow the setup steps mentioned above to start using Aoi Canvas in your aoi.js Bot.

Feel free to dm me in discord (devlordduck2) if you have any questions or need further assistance.

Enjoy coding with Aoi Canvas!
