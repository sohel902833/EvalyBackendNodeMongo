
const productValidate=product=>{

    let error={}
    if(!product.name){
        error.name="Please Enter Product name"
    }
    if(!product.category){
        error.category="Select Product Category"
    }
    if(!product.dis){
        error.dis="Enter Some Text About your product"
    }
    if(!product.price){
        error.price="Enter Product Price"
    }

    return{
        error,
        isValid:Object.keys(error).length==0
    }
}


module.exports = productValidate
