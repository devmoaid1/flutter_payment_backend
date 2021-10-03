class Database {
    constructor() {
      if (this.instance) return this.instance; 
      Database.instance = this;
  
      const admin = require("firebase-admin"); // To access Firestore API
  
      
  
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
  
      this.firestore = admin.firestore();
    }
  
   
  
   
  
    async getList(collection) {
      const result = await this.firestore.collection(collection).get();
  
      const list = [];
      result.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.paymentDate=data.paymentDate.toDate()
        list.push(data);
      });
      return list.length ? list : null;
    }
  
    async get(collection, id) {
      const result = await this.firestore.collection(collection).doc(id).get();
      if (!result.exists) return null; // Record not found
       
      const doc = result.data();
      doc.id = result.id;
      return doc;
    } 
     

    async create(collection, document) {
        const result = await this.firestore.collection(collection).add(document);
        document.id = result.id;
        return document;
      }



      async set(collection, id, document) {
        const doc = this.firestore.collection(collection).doc(id);
        const result = await doc.get();
    
        if (!result.exists) return null; // Record not found
    
        await doc.set(document);
    
        document.id = id;
        return document;
      }


      async delete(collection, id) {
        const doc = this.firestore.collection(collection).doc(id);
        const result = await doc.get();
    
        if (!result.exists) return null; // Record not found
    
        await doc.delete();
    
        return { id };
      }

    async getListByFilter(collection,filter) {
        const result = await this.firestore.collection(collection).get();
    
        const list = [];
        result.forEach((doc) => {
          const data = doc.data();
          const date=data.paymentDate.toDate();
          const month= date.toLocaleString('default', { month: 'long' })
          if(month==filter){
              data.id = doc.id; 
              data.paymentDate=date
              list.push(data);
          }
        });
        return list.length ? list : null;
      }
  
   
  
   
  }
  
  module.exports = new Database();