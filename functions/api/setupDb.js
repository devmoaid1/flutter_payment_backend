const db = require("./database");
const admin = require("firebase-admin");
async function setupDatabase(req, res, next) {
  // To delete all the collections
  const collections = ["payment"];
  collections.forEach(async (collection) => await deleteCollection(collection));

 
  // Add documents to the todos collection
  addDocuments("payment", [
    
    { paymentName: "Aeon",paymentDate:admin.firestore.Timestamp.fromDate(new Date('05/20/2021')),logo:"https://th.bing.com/th/id/R.34c53219f6c6816884112b4f8e14934d?rik=dLco8TIoTC64sA&pid=ImgRaw&r=0",amount:44.0,type:"payment"},
    { paymentName: "Tesco",paymentDate:admin.firestore.Timestamp.fromDate(new Date('02/30/2021')),logo:"https://seekcdn.com/pacman/company-profiles/logos/432826/7-eleven-logo.png",amount:73.0,type:"payment"},
    { paymentName: "7 Eleven",paymentDate:admin.firestore.Timestamp.fromDate(new Date('02/10/2021')),logo:"https://th.bing.com/th/id/OIP.MsEV99SIf-qV0mUDfn1akgHaFg?pid=ImgDet&rs=1",amount:20.0,type:"reload"},
    { paymentName: "Giant",paymentDate:admin.firestore.Timestamp.fromDate(new Date('03/10/2021')),logo:"https://th.bing.com/th/id/OIP.adSdSUd_iPt928oOUW3LUgHaD1?pid=ImgDet&rs=1",amount:44.0,type:"payment"},
   
    
    
  ]);

  res.send("Setting Up Database.... Done ");
}

async function deleteCollection(collection) {
  const cref = db.firestore.collection(collection);
  const docs = await cref.listDocuments();
  docs.forEach((doc) => doc.delete());
}

function addDocuments(collection, docs) {
  docs.forEach((doc) => db.create(collection, doc));
}

module.exports = setupDatabase; 