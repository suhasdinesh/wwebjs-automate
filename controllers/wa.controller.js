const fs = require("fs");
const { MessageMedia } = require("whatsapp-web.js");

async function sendMessage(client, to, message) {
  const messageInfo = await client.sendMessage(to, message);
  return messageInfo;
}

const sendImage = async (client, number, imagePath) => {
  console.log("Sending Image")
  const match = imagePath.match(/^data:(.*?);base64,(.*)$/);
  if (!match) {
    console.log("No Match")
    return false;
  }

  const mimeType = match[1];
  const base64Data = match[2];
  console.log("Mime Type : ",mimeType );
  const media = new MessageMedia(mimeType, base64Data);
  await client.sendMessage(number, media);
};

const sendVideo = async (client, number, videoPath) => {
  const media = MessageMedia.fromFilePath(videoPath);
  await client.sendMessage(number, media);
};

async function getContacts(client) {
  const contacts = await client.getContacts();
  const result = contacts.map((contact) => ({
    id: contact.id._serialized,
    number: contact.number,
    name: contact.name,
    pushName: contact.pushName,
  }));
  return result;
}

module.exports = {
  sendMessage,
  sendImage,
  sendVideo,
  getContacts,
};
