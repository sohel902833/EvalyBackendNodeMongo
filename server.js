const express =require('express')
const app=express()
const bodyParser=require('body-parser')
const cors =require("cors")
const  productRoutes=require('./routes/productRoutes')
const  userRoutes=require('./routes/userRoutes')

const mongoose=require('mongoose')
const morgan=require('morgan')


const  multer=require("multer")



app.use(morgan("dev"))
app.use('/uploads',express.static("uploads"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())


app.use('/evaly/api/product/',productRoutes)
app.use('/evaly/api/user/',userRoutes)







app.get('/',(req,res,next)=>{
    res.json({
        message:"Welcome Man"
    })
})




const PORT=process.env.PORT || 2001



app.listen(PORT,()=>{
        console.log(`Server is Running On Port : ${PORT}`)


    mongoose.connect(
        'mongodb://localhost/evaly-app',
        {useNewUrlParser:true},
        ()=>{
        console.log("Database Connected")
        })
})





