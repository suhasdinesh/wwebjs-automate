const { sendMessage, sendImage, sendVideo, getContacts  } = require("../controllers/wa.controller");

module.exports = function (client) {
  const express = require("express");
  const router = express.Router();

  router.post("/sendText", async (req, res) => {
    console.log("Inside Text Only");
    const { to, message } = req.body;

    if (!to || !message) {
      res.status(400).json({ error: 'Missing "to" or "message" parameter' });
      return;
    }

    try {
      await sendMessage(client, to, message);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  router.post("/sendImageWithText", async (req, res) => {
    const { to, content,imagePath } = req.body;

    if (!to || !imagePath) {
      res.status(400).json({ error: 'Missing "to" or "imagePath" parameter' });
      return;
    }

    try {
      await sendImage(client, to, imagePath);
      await sendMessage(client, to, content);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending image:", error);
      res.status(500).json({ error: "Failed to send image" });
    }
  });

  router.post("/send-video", async (req, res) => {
    const { to, videoPath } = req.body;

    if (!to || !videoPath) {
      res.status(400).json({ error: 'Missing "to" or "videoPath" parameter' });
      return;
    }

    try {
      await sendVideo(client, to, videoPath);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending video:", error);
      res.status(500).json({ error: "Failed to send video" });
    }
  });

  router.get('/getContacts', async (req, res) => {
    try {
      const contacts = await getContacts(client);
      res.json({ success: true, contacts });
    } catch (error) {
      console.error('Error getting contacts:', error);
      res.status(500).json({ error: 'Failed to get contacts' });
    }
  });


  
  return router;
};
