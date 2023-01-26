const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@node-react.com" };

exports.sendEmail = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "send.one.com",
    port: 465,
    secure: true,
    authMethod: "plain",
    domain: "postmanbank.xyz",
    requireTLS: true,
    auth: {
      user: "admin@nxtlevel4x4.com",
      pass: "nxtlevel@admin2022",
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
