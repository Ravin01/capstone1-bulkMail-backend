import Express from "express";
import { registrationModel } from "../../db/models.js";
import jwt from "jsonwebtoken";
import { transporter, mailOptions } from "../mail.js";

export const forgotPasswordRoute = Express.Router();

export let email = [];

forgotPasswordRoute.post("/", async (req, res) => {
  const payload = req.body.userEmail;
  email = [];
  email.push(payload);
  try {
    const validUser = await registrationModel.findOne({ userEmail: payload });
    if (validUser) {
      const verifyToken = jwt.sign(
        { userEmail: payload },
        process.env.JWT_SECRET,
        { expiresIn: "1day" }
      );
      const link = `${process.env.FE_URL}/reset?verify=${verifyToken}`;
      const mail = await transporter.sendMail({
        ...mailOptions,
        to: payload,
        text: `Hi please conform your email and click this link to verify you : ${link}`,
      });
      if (mail) {
        res.send("mail sended");
      }
    } else {
      res.status(401).send("invalid user");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
