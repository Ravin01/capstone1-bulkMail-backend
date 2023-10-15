import Express from "express";
import cors from 'cors'
import { connectToDb } from "./db/dbConnection.js";
import { registrationRoute } from "./routes/registration/registration.js";
import { loginRoute } from "./routes/registration/login.js";
import { forgotPasswordRoute } from "./routes/registration/forgotPassword.js";
import { resetPasswordRoute } from "./routes/registration/resetPassword.js";
import { singleMailRoute } from "./routes/sendMails/singleMail.js";


// Express
const app = Express();

// port 
const port = process.env.PORT || 8000

// DB 
await connectToDb()


// middleWare
app.use(Express.json())

app.use(cors())


// Route middleware
app.use('/registration', registrationRoute)

app.use('/login', loginRoute)

app.use('/forgotPassword', forgotPasswordRoute)

app.use('/resetPassword', resetPasswordRoute)

app.use('/sendMail', singleMailRoute)


// home page
app.get('/', (req,res)=>{
    res.send('Bulk mail application')
})


// server
app.listen(port, ()=> console.log('Server is running on : ', port))