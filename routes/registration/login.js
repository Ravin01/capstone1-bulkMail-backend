import Express from "express";
import { registrationModel } from "../../db/models.js";
import bcrypt from 'bcrypt';

export const loginRoute = Express.Router()

loginRoute.post('/', async(req,res)=>{
    const payload = req.body
    try{
        const checkUser = await registrationModel.findOne({userEmail : payload.userEmail})
        if(checkUser){
            bcrypt.compare(payload.password, checkUser.password, async(err,result)=>{
                if(!result){
                    res.status(401).send('Invalid password')
                }else{
                    res.send('User login successfully')
                }
            })
        }else{
            res.status(403).send('User not yet registered')
        }
    }catch(err){
        res.status(500).send(err)
    }
})