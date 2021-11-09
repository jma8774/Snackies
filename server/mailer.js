const nodemailer = require("nodemailer");

let transporter;

async function initializeTransporter() {
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  transporter = nodemailer.createTransport({
    service: 'Yahoo',
    port: 465,
    secure: false, 
    auth: {
      user: 'noreply_snack@yahoo.com',
      pass: 'jocwmanlpetomnsc'
    }
  });
}

initializeTransporter()

async function signup(data) {
  let info = await transporter.sendMail({
    from: '"Snackies 🍪" noreply_snack@yahoo.com', 
    to: data.to,
    subject: "Snackies Registration Confirmation", 
    text: "Your registration for Snackies is complete, we hope you enjoy your stay!",
    html: "Dear " + data.name + ',' +
          "<p>Your registration for Snackies is complete, we hope you enjoy your stay!</p>" +
          '<p>Here\'s a nyan cat for you 😊 <br/><img src="cid:nyan"/></p><br/>' +
          "Best,<br/>Snackies",
    attachments: [
      // File Stream attachment
      {
          filename: 'nyan.gif',
          path: __dirname + '/assets/nyan.gif',
          cid: 'nyan'
      }
    ],
  });
}

async function resetPassword(data) {
  let info = await transporter.sendMail({
    from: '"Snackies 🍪" noreply_snack@yahoo.com', 
    to: data.to,
    subject: "Snackies Registration Confirmation", 
    text: "Your registration for Snackies is complete, we hope you enjoy your stay!",
    html: "Dear " + data.name + ',' +
          "<p>Your registration for Snackies is complete, we hope you enjoy your stay!</p>" +
          '<p>Here\'s a nyan cat for you 😊 <br/><img src="cid:nyan"/></p><br/>' +
          "Best,<br/>Snackies",
    attachments: [
      // File Stream attachment
      {
          filename: 'nyan.gif',
          path: __dirname + '/assets/nyan.gif',
          cid: 'nyan'
      }
    ],
  });
}


module.exports = {signup, resetPassword}
