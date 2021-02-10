const router=require("express").Router()
const  userConroller=require("../controller/userController")

const multer=require("multer")

router.post('/register/',userConroller.registerUser)
router.post('/login/',userConroller.loginUser)


module.exports=router





