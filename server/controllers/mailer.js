import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

// use this to access secret variables
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js'
    }
});

/** POST: http://localhost:4001/api/v1/auth/registerMail 
 * @param: {
  "username" : "",
  "userEmail" : "",
  "text": "",
  "subject": ""
}
*/

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the email
    let email = {
        body: {
            name: username,
            intro: text || 'Welcome to G297K',
            outro: 'Need help or have questions? Just reply to this email, I\'d love to help you'
        }
    };

    let emailBody = MailGenerator.generate(email);

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Confirm account Successfull",
        html: emailBody
    };

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(StatusCodes.OK).json({ msg: "Check your email boy..." });
        })
        .catch(error => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
        })
};