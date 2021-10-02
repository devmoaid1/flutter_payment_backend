const express= require('express')  
const controller=require('../controllers/PaymentController') 


const router=express.Router() 



router.get('/',controller.getAllpayments)
router.get('/:month',controller.getPaymentsByMounth) 

module.exports=router