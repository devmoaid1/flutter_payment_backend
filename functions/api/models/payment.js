const db=require("../database");


class PaymentModel{
      
    constructor() {
            
        if (this.instance) return this.instance; 
        PaymentModel.instance = this;
    } 


    get(){
        return db.getList('payment');
    } 


    getByfilter(filter){
        return db.getListByFilter('payment',filter);
    }

} 

module.exports=new PaymentModel();