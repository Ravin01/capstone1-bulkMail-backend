import Express from "express";
import { importantMailsModel } from "../../db/models.js";

export const importantMailRoute = Express.Router();

importantMailRoute.get("/", async (req, res) => {
  try {
    const allMail = await importantMailsModel.find({});
    if (allMail) {
      res.send(allMail);
    } else {
      res.status(401).send("Not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

importantMailRoute.get("/:mailId", async (req, res) => {
  const { mailId } = req.params;
  console.log(mailId);
  try {
    const singleMail = await importantMailsModel.findOne(
      { mailId: mailId },
      { _id: 0, id: 1, to: 1, subject: 1, text: 1 }
    );
    if (singleMail) {
      res.send(singleMail);
    } else {
      res.status(403).send("Not found");
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

importantMailRoute.post("/", async (req, res) => {
  let payload = req.body;
  try {
    console.log(payload.mailId);
    const checkExists = await importantMailsModel.findOne(
      { mailId: payload.mailId },
      { _id: 0, mailId: 1 }
    );
    if (checkExists) {
      res.status(402).send(checkExists);
    } else {
      let addToImport;
      for (let i = 0; i <= payload.to.length - 1; i++) {
        addToImport = await importantMailsModel.create({
          ...payload,
          to: payload.to[i],
        });
      }
      if (addToImport) {
        res.send("Successfully Added");
      } else {
        res.send("Not add");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

importantMailRoute.delete("/:mailId", async (req, res) => {
  let mailId = req.params.mailId;
  try {
    const mail = await importantMailsModel.deleteOne({ mailId: mailId });
    if (mail) {
      res.send("Deleted successfully");
    } else {
      res.send("Cannot delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});
