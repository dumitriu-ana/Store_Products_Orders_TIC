const {
    initializeApp,
    applicationDefault,
    cert,
  } = require("firebase-admin/app");
  const {
    getFirestore,
    Timestamp,
    FieldValue,
  } = require("firebase-admin/firestore");

  const {
    getAuth
  }= require("firebase-admin/auth")
  
  const serviceAccount = require("../api/anaproiectticvue-firebase-adminsdk-duztz-d9b87047ff.json");

  
  initializeApp({
    credential: cert(serviceAccount),
  });
  
  const db = getFirestore();
  module.exports = db;