const payment=require("../models/payment") 


class PaymentController{ 

    constructor(){
        if (this.instance) return this.instance; // This is the key idea of implementing singleton. Return the same instance (i.e. the one that has already been created before)
      
        // We only proceedd to the following lines only if no instance has been created from this class
        PaymentController.instance = this;
       } 
       
    
   
    getAllpayments=async(req,res,next)=>{
   
       try{
   
            const payments=await payment.get();
            
            if(!payments){
                return res.status(400)
            }else{
   
               res.json(payments)
            }
   
   
       }catch(err){
   
            return next(err)
       }
   }
   

   getPaymentsByMounth=async(req,res,next)=>{

            const month=req.params.month;

            try{
                 
                 const payments =await payment.getByfilter(month); 

                 if(!payments){
                     res.status(404).json("empty list");
                 }
                 else {
                     res.json(payments);
                 }


            }catch(err){
                return next(err);
            }



   }
   



  } 


  module.exports=new PaymentController()