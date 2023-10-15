import Express from "express";
import { mailsModel } from "../../db/models.js";
import { mailOptions, transporter } from "../mail.js";
import {v4} from 'uuid'

export const singleMailRoute = Express.Router();

singleMailRoute.get("/", async (req, res) => {
  try {
    const allMail = await mailsModel.find({});
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

singleMailRoute.get('/:mailId', async(req,res)=>{
  const payload = req.body
  const {mailId} = req.params;
  try{
    const singleMail = await mailsModel.findOne({mailId : mailId},{_id : 0, id:1, to:1, subject:1, text:1})
  if(singleMail){
    res.send(singleMail)
  } else{
    res.status(403).send('Not found')
  }
  }catch(err){
    res.status(500).send(err)
    console.log(err)
  }
})

singleMailRoute.post("/", async (req, res) => {
  const payload = req.body;
  try {
    if (payload.from === process.env.FROM) {
      let newUser, sendMail;
      for (let i = 0; i <= payload.to.length - 1; i++) {
        sendMail = await transporter.sendMail({
          ...mailOptions,
          from: payload.from,
          to: payload.to[i],
          subject: payload.subject,
          text: payload.text,
        });
        let spoTime = Date.now()
        newUser = await mailsModel.create({ ...payload, time: Date.now(), to : payload.to[i], mailId : "3" });
      }
      if (newUser && sendMail) {
        res.send("Mail sended");
      } else {
        res.status(401).send("Error, check your connectivity");
      }
    } else {
      res.status(402).send("You cannot send email, change your from");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
