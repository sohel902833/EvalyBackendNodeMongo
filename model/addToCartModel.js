const  mongoose=require("mongoose")
const  Schema=mongoose.Schema


const AddToCart=new Schema({


    userid:{
        type:String,
        required:true
    },
    pid:{
        type:String,
        required: true,
        unique:true

    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:String,
        required:true
    }



})

const Cart=mongoose.model("Cart",AddToCart)

module.exports=Cart