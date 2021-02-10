const validator=require("validator")


const validate=user=>{
        let error={}

        if(!user.fname){
            error.fname="Please Provide Your First Name"
            }
        if(!user.lname){
            error.lname="Please Provide Your Last Name"
        }
       if(!user.email){
           error.email="Please Provide Your Email"
       } else if(!validator.isEmail(user.email)){
            error.email="Please Provide a Valid Email"
       }

       if(!user.password){
           error.password="Please Provide Your Password"
       }else if(user.password.length<6){
           error.password="Password Must be Greater or Equal 6 Characters"
       }
       if(!user.phone){
           error.phone="Please Provide Your Phone Number"
       }


    return{
           error,
        isValid:Object.keys(error).length==0
    }


}

module.exports=validate