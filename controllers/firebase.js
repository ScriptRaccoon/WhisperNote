const admin = require("firebase-admin");

const serviceAccount = {
    type: "service_account",
    project_id: "whispernoteapp",
    private_key_id: "19bb29542d6380a422795fe78f71b708d10f15c6",
    private_key: process.env.FIREBASE_KEY,
    client_email: "firebase-adminsdk-b63n0@whispernoteapp.iam.gserviceaccount.com",
    client_id: "112279446267700946010",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b63n0%40whispernoteapp.iam.gserviceaccount.com",
};

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firestore = app.firestore();

module.exports = { firestore };
