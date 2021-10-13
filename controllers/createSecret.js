const firestore = require("./firestore.js");
const { encrypt, hashedPassword } = require("./encryption.js");

async function createSecret(secret) {
    try {
        const originalPassword = secret.password;
        secret.created = new Date();
        secret.content = encrypt(secret.content);
        if (originalPassword) secret.password = await hashedPassword(originalPassword);
        const docRef = await firestore.collection("secrets").add(secret);
        const id = docRef.id;
        console.log("Secret has been created with id", id);
        return { id, password: originalPassword };
    } catch (err) {
        console.log("Secret could not be created");
        console.log(err);
        return { error: err };
    }
}

module.exports = createSecret;
