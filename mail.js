// This node file sends an email with two attachments cards.png and habits.png
// it is meant to be invoked after a build is completed in Travis-ci.
// Make sure environment variables EMAIL and EMAIL_PASS are set.
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
	    // you gmail account email and password
	    user: process.env.EMAIL,
	    pass: process.env.EMAIL_PASS
    }
});

// No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Travis CI <no-reply@travis-ci.org>', // sender address
    to: process.env.EMAIL, // list of receivers
    subject: 'Build complete ✔', // Subject line
    html: 'See results:', // html body
    attachments: [{
       path: './cards.png'
    },
    {
	     path: './habits.png'
    }]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
