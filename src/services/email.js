const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Contacts Service",
    link: "http://localhost:3000/api/users",
  },
});

const createEmail = (verifyToken) => {
  const email = {
    body: {
      name: "New User",
      intro:
        "Welcome to Contacts Service! We're very excited to have you on board.",
      action: {
        instructions:
          "To get started with Contacts Service, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: `http://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  return mailGenerator.generate(email);
};

const sendEmail = (verifyToken, email) => {
  const emailBody = createEmail(verifyToken);

  const msg = {
    to: email,
    from: "oleoli.pro@gmail.com",
    subject: "Email confirmation for Contacts Service",
    html: emailBody,
  };

  return sgMail.send(msg);
};

module.exports = { sendEmail };
