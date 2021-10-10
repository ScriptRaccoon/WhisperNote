const { firestore } = require("./firebase.js");
const { decrypt } = require("./encryption.js");

async function getSecret(id) {
    try {
        const docRef = firestore.collection("secrets").doc(id);
        let doc = await docRef.get();
        if (!doc.exists) {
            throw "There is no such secret.";
        }
        const secret = doc.data();
        const now = new Date();
        const then = secret.created.toDate();
        const hoursPassed = (now - then) / (1000 * 60 * 60);
        if (hoursPassed >= parseInt(secret.expires_in)) {
            await docRef.delete();
            throw "This secret has expired.";
        }
        await docRef.delete();
        return { content: decrypt(secret.content) };
    } catch (err) {
        return { error: err };
    }
}

module.exports = { getSecret };
