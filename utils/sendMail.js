import { createTransport } from 'nodemailer';
import {EMAIL_SENDER} from '../config';

// create reusable transporter object using SMTP transport
const transporter = createTransport(EMAIL_SENDER);

/**
 * to: mail
 * verifyAddress:
 */
export default function sendMail(email, verifyAddress) {
  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails
  console.log(typeof email);

  // setup e-mail data with unicode symbols
  let mailOptions = {
      from: 'TimQian ✔ <qianlijiang123@gmail.com>', // sender address
      to: `${email}`,                              // list of receivers
      subject: '确认邮箱', // Subject line
      text: `${verifyAddress}`, // plaintext body
      html: `<a href="${verifyAddress}">
               Click to verify your email
             </a>`
  };

  // send mail with defined transport object
  return transporter.sendMail(mailOptions);
}