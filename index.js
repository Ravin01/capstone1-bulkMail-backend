import Express from "express";
import cors from 'cors'
import jwt from "jsonwebtoken";

import { connectToDb } from "./db/dbConnection.js";
import { registrationRoute } from "./routes/registration/registration.js";
import { loginRoute } from "./routes/registration/login.js";
import { forgotPasswordRoute } from "./routes/registration/forgotPassword.js";
import { resetPasswordRoute } from "./routes/registration/resetPassword.js";
import { normalMailRoute } from "./routes/sendMails/normalMail.js";
import { importantMailRoute } from "./routes/sendMails/importantMail.js";


// Express
const app = Express();

// port 
const port = process.env.PORT || 8000

// DB 
await connectToDb()


// middleWare
app.use(Express.json())

app.use(cors())



const authMiddleWare=(req,res,next)=>{
    // const [,token] = req.headers['authorization'].split(' ')
    const token = req.headers['auth-token']
    try{
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    }catch(err){
        console.error(err)
        res.status(401).send({msg:'unauthorized'})
    }
}

// app.use(authMiddleWare)



// Route middleware
app.use('/registration', registrationRoute)

app.use('/login', loginRoute)

app.use('/forgotPassword', forgotPasswordRoute)

app.use('/resetPassword', resetPasswordRoute)

app.use('/mails', authMiddleWare, normalMailRoute)

app.use('/importantMails', authMiddleWare, importantMailRoute)


// home page
app.get('/', (req,res)=>{
    res.send('Bulk mail application')
})


// server
app.listen(port, ()=> console.log('Server is running on : ', port))