
const registervalidator=require("../validator/registerValidator")
const  bcrypt =require("bcrypt")
const User=require("../model/userModel")
const loginValidator=require("../validator/loginValidator")
const jwt =require("jsonwebtoken")



registerUser=(req,res,next)=>{

        let {fname,lname,email,password,phone}=req.body

       let validate=registervalidator({fname,lname,email,password,phone})


    if(!validate.isValid){
        return  res.json(validate.error)
    }else{

        User.findOne({email})
            .then(user=>{
                        if(user){
                            return res.json({
                                message:"This Email Is Already Exists"
                            })
                        }

                        bcrypt.hash(password,11,(err,hash)=>{

                            if(err){
                                return  res.json(err)
                            }


                            let user=new User({
                                fname,
                                lname,
                                email,
                                password:hash,
                                phone
                            })


                            user.save()
                                .then(user=>{
                                    res.json({
                                        message:"User Created Successfully",
                                        user
                                    })
                                })
                                .catch(error=>res.json(error))
                        })
            }).catch(error=>res.json(error))



    }

}



loginUser=(req,res,next)=>{

            let email=req.body.email
            let password=req.body.password


    let validate=loginValidator({email,password})

    if(!validate.isValid){
        res.json(validate.error)
    }
    User.findOne({email})
        .then(user=>{

            if(!user){
                return  res.json({message:"User Not Found"})
            }else{


                bcrypt.compare(password,user.password,(error,result)=>{

                        if(error){
                            return  res.json(error)
                        }
                        if(!result){
                            return  res.json({
                                message:"Password, Doesn\'t Match"
                            })
                        }
                          let token=jwt.sign({
                        _id:user._id,
                        fname:user.fname,
                        email:user.email,
                        lname:user.lname,
                        phone: user.phone,
                    },"SECRET",{expiresIn:'7d'})

                    res.status(200).json({
                        message:"Login Successful",
                        token: `Bearer ${token}`
                    })

                })
            }
        }).catch(error=>res.json(error))
}












module.exports={
   registerUser,
    loginUser
}