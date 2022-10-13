import twilio from "twilio";
import "dotenv/config";
import { TrustProductsChannelEndpointAssignmentInstance } from "twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendWhatsapp = async () => {
  try {
    const optionsW = {
      body: "Hola soy un WSP desde Node.js!",
      //mediaUrl: [ 'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg' ],
      from: "whatsapp:+14155238886",
      to: process.env.cellAdmin,
    };

    const optionsS = {
      body: "Hola soy un SMS desde Node.js!",
      from: "+14156884237",
      to: "+541199998888",
    };
    const message = await client.messages.create(optionsW);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

export default sendWhatsapp;
