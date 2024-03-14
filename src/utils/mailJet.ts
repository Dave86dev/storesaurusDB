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
        HTMLPart: `<h3>Here is your activation code: </h3>${token}`,
      },
    ],
  });

  return {
    message: `An email was sent to ${email}.`,
  };
};

export const deactivateEmail = async (
  email: string
): Promise<serviceAnswer> => {
  await mailJet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "storesaurusdb@gmail.com",
          Name: "Storesaurus",
        },
        To: [
          {
            Email: "storesaurusdb@gmail.com",
            Name: `From ${email}`,
          },
        ],
        Subject: `User ${email} request for deactivation`,
        TextPart: `Dear staff at storesaurusdb, ${email} asks for deactivation`,
        HTMLPart: `<h3>Dear staff at storesaurusdb, I ask for my deactivation: </h3>${email}`,
      },
    ],
  });

  return {
    message: `An email was sent to the administration, allow 48 hours for your account deactivation.`,
  };
};
