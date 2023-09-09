const nodemailer = require('nodemailer');
require('dotenv').config();
const mailSender = async (email,title,body)=>{
    try{
        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER, // generated ethereal user
              pass: process.env.MAIL_PASS, // generated ethereal password
            },
        });
        console.log("transport: ",transport)
        let info = await transport.sendMail({
            from: 'StudyNotion || codehelp - by shukla', // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            html: `${body}`, // html body
          });
          console.log(info);
          return info;
    } catch(error){
      console.log("error in mail send")
      console.log(error.message);
    }
}
module.exports = mailSender;