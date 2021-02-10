const router=require("express").Router()
const productController=require("../controller/productController")


const multer=require("multer")


const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})


// const fileFilter=(req,file,cb)=>{
//
//
//     if(file.minetype==='image/jpeg' || file.minetype==='image/png' || file.minetype==='image/jpg'){
//         cb(null,true)
//     }else{
//         cb(null,false)
//     }
//
//
//
// }


//const upload=multer({dest: "uploads/"})
const upload=multer({storage:storage,limits:{
    fileSize:1024*1024*100
    }})

router.post('/', upload.array('imgCollection', 6),productController.addProduct)
router.get('/',productController.getProduct)
router.get('/:id',productController.getSingleProduct)
router.delete('/:id',productController.deleteProduct)
router.put('/rating/:pid', productController.updateRating)

router.get('/cat/:cat',productController.getByCategory)
router.post('/addtocart/',productController.AddToCart)
router.post('/comment/',productController.addComments)




module.exports= router