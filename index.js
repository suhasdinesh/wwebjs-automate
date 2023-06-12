#!/usr/bin/env node
const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const waRoutes = require('./routes/wa.routes');
const qrcode = require('qrcode-terminal');
const cors = require('cors')
const bodyParser = require('body-parser');

const client = new Client({
    authStrategy : new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('Please scan the QR code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async() => {
    await client.sendMessage("918296299458@c.us","Server Online")
    console.log('WhatsApp client is ready!');
});

client.initialize();

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use(express.json());

app.use('/api', waRoutes(client));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
