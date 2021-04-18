const {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} = require("discord-interactions");
const https = require("https");

exports.handler = async function (event) {
  // Check for public key
  const CLIENT_PUBLIC_KEY = process.env.AUTH_TOKEN;
  if (!CLIENT_PUBLIC_KEY) {
    console.log(
      "No auth token found, please set the AUTH_TOKEN environment variable.\n"
    );
    process.exit();
  }  

  // Verify the request. Need to do this or Discord will disable the integration.
  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];
  const isValidRequest = await verifyKey(
    event.body,
    signature,
    timestamp,
    CLIENT_PUBLIC_KEY
  );  
  if (!isValidRequest) {
    console.log("Bad request");
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Bad request signature",
      }),
    };
  }
  
  const body = JSON.parse(event.body);

  // It's an invocation of the slash command
  if (body && body.type === InteractionType.APPLICATION_COMMAND) {
    const gifs = [
      //"https://i.gifer.com/9I2.gif",
      //"https://media.giphy.com/media/nJPkKr231dvKo/giphy.gif",
      //"https://i.gifer.com/2AZI.gif",
      //"https://i.imgur.com/6DpDNFS.gif",
      "http://gph.is/1CF6Lgl", // Duh we're in the Rockies
    ];
  
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `${gifs[Math.floor(Math.random() * gifs.length)]}`,
      },
    };
  // Or it's just Discord pinging the endpoint, which we need to ack for the integration to keep working
  } else {
    console.log("responding with PONG");
    return {
      type: InteractionResponseType.PONG,
    };
  }
};
