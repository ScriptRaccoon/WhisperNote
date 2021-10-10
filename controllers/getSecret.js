const { firestore } = require("./firebase.js");
const { decrypt } = require("./encryption.js");
const { isExpired } = require("./expiredSecrets.js");

async function getSecret(id) {
    try {
        const docRef = firestore.collection("secrets").doc(id);
        let doc = await docRef.get();
        if (!doc.exists) {
            console.log(`There is no secret with id ${id}`);
            throw "There is no such secret.";
        }
        const secret = doc.data();
        if (isExpired(doc)) {
            await docRef.delete();
            console.log(`Secret with id ${id} is expired and therefore deleted`);
            throw "This secret has expired.";
        }
        await docRef.delete();
        console.log(`Secret with id ${id} has been opened and therefore deleted`);
        return { content: decrypt(secret.content) };
    } catch (err) {
        return { error: err };
    }
}

module.exports = { getSecret };
