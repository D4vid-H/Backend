import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.mailUser,
    pass: process.env.mailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/* const mailOptions = {
  from: "Nuevo Registro",
  to: TEST_MAIL,
  subject: "Mail de prueba desde Node.js - cliente nuevo",
  html: '<h1 style="color: blue;">Se registro nuevo usuario<span style="color: green;">Node.js con Nodemailer</span></h1>',
}; */

const sendMailer = async (options) => {
  try {
    const mailOptions = {
      from: "Nuevo Registro",
      to: TEST_MAIL,
      subject: "Mail de prueba desde Node.js - cliente nuevo",
      html: `<h1 style="color: blue;">Se registro nuevo usuario<span style="color: green;">Node.js con Nodemailer</span></h1> <ul><li>${options.user}</li><li>${options.names}</li><li>${options.address}</li><li>${options.age}</li><li>${options.cel}</li></ul>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log("este error es por el envio de mails:");
    console.log(error);
  }
};

export default sendMailer;
