require("dotenv").config();

const admin = require("firebase-admin");

const serviceAccount = {
    type: "service_account",
    project_id: "whispernoteapp",
    private_key_id: "51155c78d1c84a0490d6476a64da961c38c67d94",
    private_key: process.env.FIREBASE_KEY.replace(/\\n/g, "\n"),
    client_email: "firebase-adminsdk-dhmpg@whispernoteapp.iam.gserviceaccount.com",
    client_id: "109957907066713622113",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dhmpg%40whispernoteapp.iam.gserviceaccount.com",
};

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firestore = app.firestore();

console.log("Firestore loaded for", firestore.projectId);

module.exports = firestore;
