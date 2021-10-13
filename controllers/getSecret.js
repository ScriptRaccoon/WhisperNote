const firestore = require("./firestore.js");
const { decrypt, verifyPassword } = require("./encryption.js");
const { isExpired } = require("./expiredSecrets.js");

async function getSecret(id, password) {
    try {
        const docRef = firestore.collection("secrets").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            console.log(`There is no secret with id ${id}`);
            throw "There is no such secret.";
        }
        const secret = doc.data();
        if (isExpired(secret)) {
            await docRef.delete();
            console.log(`Secret with id ${id} is expired and therefore deleted`);
            throw "This secret has expired.";
        }
        if (secret.password) {
            const valid = await verifyPassword(password, secret.password);
            if (!valid) {
                throw "The password is not correct";
            }
        }
        await docRef.delete();
        console.log(`Secret with id ${id} has been opened and therefore deleted`);
        return { content: decrypt(secret.content) };
    } catch (err) {
        return { error: err };
    }
}

module.exports = getSecret;
