import appConfig from "../../config";
import { serviceAnswer } from "../interfaces";

const MailJet = require("node-mailjet");
const mailJet = MailJet.apiConnect(
  appConfig.apiMailjet,
  appConfig.secretMailjet
);

export const sendEmail = async (
  email: string,
  token: string
): Promise<serviceAnswer> => {
  try {
    await mailJet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "storesaurusdb@gmail.com",
            Name: "Storesaurus",
          },
          To: [
            {
              Email: email,
              Name: "Dear user",
            },
          ],
          Subject: "Your storesaurus registry code",
          TextPart: `Here is your activation code: ${token}`,
          HTMLPart: `<h3>Here is your activation code: ${token}</h3>`,
        },
      ],
    });

    return {
      message: `An email was sent to ${email} for further registration.`,
    };
  } catch (error) {
    throw error;
  }
};
