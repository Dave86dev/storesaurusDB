// import * as errors from "restify-errors";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "../../../../../db";
import { sendEmail } from "../../../../../utils/mailJet";
import { serviceAnswer } from "../../../../../interfaces";
// import { credentials } from "../../../../../interfaces";

export class MailJetService {
  async sendMailCode(email: string): Promise<serviceAnswer> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  
}
