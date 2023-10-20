import Express from "express";
import { registrationModel } from "../../db/models.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registrationRoute = Express.Router();

registrationRoute.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const allUser = await registrationModel.findOne({
      userEmail: payload.userEmail,
    });
    if (allUser) {
      const response = allUser.toObject();
      res.status(409).send(response);
    } else {
      bcrypt.hash(payload.password, 10, async (err, hash) => {
        if (err) {
          res.status(500).send(err);
        }
        const response = await registrationModel.create({
          ...payload,
          userId: v4(),
          password: hash,
        });
        if (response) {
          const newRegis = response.toObject();
          const accessToken = jwt.sign(newRegis, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          console.log({ ...newRegis, accessToken });
          res.send({ ...newRegis, accessToken });
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
