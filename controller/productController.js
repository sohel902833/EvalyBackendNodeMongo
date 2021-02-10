const Product = require("../model/productModel")
const productValidate = require('../validator/productValidator')
const  Cart =require('../model/addToCartModel')
addProduct = (req, res, next) => {

    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
       // reqFiles.push( req.files[i].filename)
        reqFiles.push(url + '/uploads/' + req.files[i].filename)
    }


    let {brand, category, name, price, image, dis, date, time, discount} = req.body
    let validate = productValidate({name, price, category, dis})

    if(!validate.isValid){
        return  res.status(400).json(validate.error)
    }else{

            let product=new Product({
                brand,
                category,
                name,
                price,
                dis,
                date,
                time,
                discount,
                image:reqFiles
            })


        product.save()
            .then(pro=>{
                res.status(201).json({
                    message:"Product Added",
                    pro
                })
            })
            .catch(error=>{
                res.json({
                    message:"Server Error",
                    error
                })
            })
    }

}



getProduct=(req,res)=>{

        Product.find()
            .then(result=>{
                res.json(result)
            })
            .catch(error=>{
                res.json({
                    message:"Server Error"
                })
            })

}


deleteProduct=(req,res,next)=>{

    let { id}=req.params
    Product.findOneAndDelete({_id:id})
        .then(result=>{
            res.status(200).json({
                message:"Deleted Successfully"
            })
        })
        .catch(error=>res.json(error))


}

getByCategory=(req,res,next)=>{
   let cat=req.params.cat

    Product.find({"category":cat})
        .then(result=>{
                res.json(result)
        })
        .catch(error=>{
            console.log("Error"+error)
        })
}

getSingleProduct =(req,res,next)=>{
    let id=req.params.id
    Product.findOne({_id:id})
        .then(result=>{
            if(!result){
                res.json({
                    message:"No Product Found",
                    result
                })
            }else{
               
            res.json(result) 
            }


        })
        .catch(error=>{
            res.status(400).json({
                message:"Server Error",
                error
            })
        })


}



addComments=(req,res,next)=>{
        let userid=req.body.uid
        let comment=req.body.comment
        let  rating=req.body.rating
        let productid=req.body.pid



        Product.findOne({_id:productid})
            .then(product=>{

                    let updatecomment={
                        comment,
                        userid,
                        productid,
                        rating
                    }

                product.comments.unshift(updatecomment)

                    Product.findOneAndUpdate({_id:productid},{comments:product.comments})
                        .then(result=>{
                            res.json(result)
                        })


            })


}



updateRating=(req,res,next)=>{
    let productid=req.params.pid
    let userRatings=req.body.rating

            Product.findOne({_id:productid})
                .then(pro=>{


                     let totalRating=pro.ratings.unshift(userRatings)
                    let sumofRating=0
                    pro.ratings.map(function (x){
                        sumofRating=sumofRating+Number(x)
                    })

                    let mRating=sumofRating/totalRating
                    let mainRating=mRating.toFixed(1)



                    Product.findOneAndUpdate({ _id: productid }, { ratings:pro.ratings,totalrating:totalRating,mainrating:mainRating})
                        .then(result=>{
                            Product.findById({_id:result._id})
                                .then(updatedproduct=>{
                                    res.json(
                                        updatedproduct

                                    )
                                })

                        })
                })
}


AddToCart=(req,res,next)=>{
        let productId=req.body.pid
        let userid=req.body.uid
        let price =req.body.price
        let quantity =req.body.quantity



    let cart=new Cart({
        userid,
        pid:productId,
        price,
        quantity
    })

    cart.save()
        .then(result=>{
            res.json(result)
        }).catch(error=>{
            res.json(error)
    })





}



module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    getByCategory,
    getSingleProduct,
    updateRating,
    AddToCart,
    addComments

}