const mongoose =require("mongoose")
const Schema=mongoose.Schema



const ProductSchema=new Schema({

    brand:{
        type:String
    },
  category:{
        type:String,
      required:true
  },
  name:{
        type:String,
      required: true
  }
  ,
    price:{
        type:Number,
        required:true
    }
    ,
    image:{
        type:Array
    },
    dis:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    discount:{
        type:Number
    },
    mainrating:{
        type:Number
    },
    totalrating:{
        type:String
    },
    ratings:{
        type:Array
    },
    comments:{
        type:Array
    }
})



const Product=mongoose.model('Product',ProductSchema)
module.exports=Product



