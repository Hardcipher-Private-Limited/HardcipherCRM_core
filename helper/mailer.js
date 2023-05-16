const nodemailer = require("nodemailer");

exports.send_mail = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD,
      },
    });
    const { from, to, cc, bcc, subject, text,html } = req.body;
    const message = {
      from: from,
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      text: text,
       html:html
     };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err.message);
      } else {
        res
          .status(200)
          .json({ status: true, message: "mail sent", data: info });
      }
    });  
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "mail not sent", error: err.message });
  }
};
