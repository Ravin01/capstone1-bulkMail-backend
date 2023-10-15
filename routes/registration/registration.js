import Express from "express";
import { registrationModel } from "../../db/models.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

export const registrationRoute = Express.Router();

registrationRoute.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const allUser = await registrationModel.findOne({
      userEmail: payload.userEmail,
    });
    if (allUser) {
      res.status(409).send("User already exists");
    } else {
      bcrypt.hash(payload.password, 10, async(err, hash) => {
        if (err) {
          res.status(500).send("Error while register");
        }
        const response = await registrationModel.create({
            ...payload,
            userId: v4(),
            password: hash,
          });
          if (response) {
            res.send("User created successfully");
          }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
