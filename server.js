const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL_FROM,
        pass: process.env.GMAIL_PASSWORD_FROM
    }
});

app.post("/", (request, response) => {
    const text = 'Commande de ' +
        request.body.username +
        ': ' +
        request.body.alcohol + (
            request.body.soft ? ' + ' + request.body.soft : ''
        ) + '. ' + (
            request.body.comment ? 'Petites précisions : ' + request.body.comment + '. ' : ''
        ) + 'Avec le sourire Cassandre ! (et tu dis merci)';
    const mailOptions = {
        from: process.env.GMAIL_EMAIL_FROM,
        to: process.env.GMAIL_EMAIL_TO,
        subject: 'Cassapp commande',
        text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200).send('OK');
        }
    });
});

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});