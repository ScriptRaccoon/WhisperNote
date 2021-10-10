const { firestore } = require("./firebase.js");
const { encrypt } = require("./encryption.js");

async function submitSecret(secret) {
    try {
        secret.created = new Date();
        secret.content = encrypt(secret.content);
        const docRef = await firestore.collection("secrets").add(secret);
        const id = docRef.id;
        console.log("Secret has been created with id", id);
        return { id };
    } catch (err) {
        return { error: err };
    }
}

module.exports = { submitSecret };
