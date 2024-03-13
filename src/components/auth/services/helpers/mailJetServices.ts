import { v4 as uuidv4 } from "uuid";
import { getDb } from "../../../../db";
import { deactivateEmail, sendEmail } from "../../../../utils/mailJet";
import { serviceAnswer } from "../../../../interfaces";

export class MailJetService {
  async sendMailCode(email: string): Promise<serviceAnswer> {
    const db = getDb();

    const token = uuidv4();

    await db.collection("PreTokens_Collection").insertOne({
      email: email,
      token: token,
      createdAt: new Date(),
    });

    const sendingAnswer = await sendEmail(email, token);

    return {
      message: sendingAnswer.message,
    };
  }

  async sendMailDeactivation(email: string): Promise<serviceAnswer> {
    const sendingAnswer = await deactivateEmail(email);

    return {
      message: sendingAnswer.message,
    };
  }
}
