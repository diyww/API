var config = require('../config');
var nodemailer = require('nodemailer');

var mailer = {
    sendMail: function (reciver,subject,plain,html) {
        console.log("sendMail");

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://'+config.smtp.user+':'+config.smtp.pw+'@'+config.smtp.server+'');

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"'+config.smtp.sender.name +' " <'+config.smtp.sender.email +'>', // sender address
            to: reciver, // list of receivers
            subject: subject, // Subject line
            text: plain, // plaintext body
            html: html // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
};

module.exports = mailer;