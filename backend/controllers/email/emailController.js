/* 
Authored by Rutu Joshi, B00897744, rt296393@dal.ca
*/




exports.sendEmail = async (req, res) => {

    try{
        var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
      auth: {
        user: 'scotia.jwellers@gmail.com',
        pass: 'wjcdrechqgtmzfrs'
      }
    });
    
    var mailOptions = {
      from: 'scotia.jwellers@gmail.com',
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
    
    
    

}



