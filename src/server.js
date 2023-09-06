import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/index';
import bodyParser from 'body-parser';


const app=express();
dotenv.config()
app.use(bodyParser.json())
app.use("/api/v1",router)
const database=process.env.DATABASE_URL
const port=process.env.PORT

//configure port

app.listen(port,()=>{
    console.log(`Port running on ${port}`)
})
mongoose.connect(database).then(()=>{
    console.log(`database connection wow`)
}).catch((err)=>{
    console.log(`database error is ...${err}`)
})

export default app