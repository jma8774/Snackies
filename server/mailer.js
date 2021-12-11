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
      user: process.env.YAHOO_USER,
      pass: process.env.YAHOO_PASSWORD
    }
  });
}

initializeTransporter()

const resetLink = process.env.DOMAIN_NAME + "/reset"

async function signup(data) {
  try{
    let info = await transporter.sendMail({
      from: '"Snackies 🍪" ' + process.env.YAHOO_USER, 
      to: data.to,
      subject: "Snackies Registration Confirmation", 
      text: "Your registration for Snackies is complete, I hope you enjoy your stay!",
      html: `Dear ${data.name}, ` +
            "<p>Your registration for Snackies is complete, I hope you enjoy your stay!</p>" +
            `<p>If you ever forget your password, you can reset it here: <a href=${resetLink}> ${resetLink} </a> </p>` +
            '<p>Also, here\'s a nyan cat for you 😊 <br/><img src="cid:nyan"/></p><br/>' +
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
  catch(err) {
    console.log("Email (Sign Up) Error", err)
  }
}

async function resetPassword(data) {
  try{
    let info = await transporter.sendMail({
      from: '"Snackies 🍪" ' + process.env.YAHOO_USER, 
      to: data.to,
      subject: "Snackies Password Reset", 
      text: "Here is the link to reset your Snackies password",
      html: `Dear ${data.name}, ` +
            `<p>Click this <a href=${data.url}>link</a> to reset your password.<p/>` +
            '<p>It will expire in 15 minutes and may only be used once to change your password.</p><br/>' +
            "Best,<br/>Snackies",
    });
  } catch(err) {
    console.log("Email (Reset Password) Error", err)
  }
}

async function orderComplete(data) {
  try{
    let info = await transporter.sendMail({
      from: '"Snackies 🍪" ' + process.env.YAHOO_USER, 
      to: data.to,
      subject: `Snackies Order Confirmation`, 
      text: `Order ID ${data.orderId}`,
      html: `Dear ${data.name}, ` +
            `<p>Your recent order ${data.orderId} has been confirmed. We will begin shipping your items shortly. </p>` +
            `<p>Click this <a href=${process.env.DOMAIN_NAME}/orders>link</a> to see your orders.<p/></br>` +
            "Best,<br/>Snackies",
    });
  } catch(err) {
    console.log("Email (Order Complete) Error", err)
  }
}

module.exports = {signup, resetPassword, orderComplete}
