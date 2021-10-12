const firestore = require("./firestore.js");
const { encrypt } = require("./encryption.js");

async function createSecret(secret) {
    try {
        secret.created = new Date();
        secret.content = encrypt(secret.content);
        const docRef = await firestore.collection("secrets").add(secret);
        const id = docRef.id;
        console.log("Secret has been created with id", id);
        return { id };
    } catch (err) {
        console.log("Secret could not be created");
        console.log(err);
        return { error: err };
    }
}

module.exports = createSecret;
