const { getFirestore } = require('firebase-admin/firestore')
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./../serviceAccountKey.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

module.exports = db;