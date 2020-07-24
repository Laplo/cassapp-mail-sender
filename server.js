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

app.post("/", ({body: {username, alcohol, soft, comment, orderId}}, response) => {
    const html = '<h1 style="text-align: center; font-size: medium">' + username + ' vous passe une commande !!!</h1>' +
        '<h2 style="text-align: center; font-size: smaller">' + (alcohol ? alcohol : '' ) + (soft ? (alcohol ? ' + ' : '') + soft : '' ) + '</h2>'
        + (comment ? '<h3 style="font-style: italic; text-align: center; font-size: small">“ ' + comment + ' . ”</h3>' : '')
        + '<h3 style="font-size: xx-small">Avec le sourire Cassandre ! (et tu dis merci)</h3>'
        + '<br />'
        + '<br />'
        + '<p>------------------------</p>'
        + '<p>La Cassapp team / Support : cassapp.commande@gmail.com</p>';
    const mailOptions = {
        from: process.env.GMAIL_EMAIL_FROM,
        to: process.env.GMAIL_EMAIL_TO,
        subject: 'Cassapp commande n°' + orderId,
        html
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
