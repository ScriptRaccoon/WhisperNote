const firestore = require("./firestore.js");

function isExpired(secret) {
    const now = new Date();
    const then = secret.created.toDate();
    const hoursPassed = (now - then) / (1000 * 60 * 60);
    return hoursPassed >= secret.expires_in;
}

async function deleteExpired() {
    console.log("Check for expired secrets");
    let counter = 0;
    const snap = await firestore.collection("secrets").get();
    snap.forEach((doc) => {
        const secret = doc.data();
        if (isExpired(secret)) {
            counter++;
            console.log(`Secret with id ${doc.id} is expired and therefore deleted`);
            doc.ref.delete();
        }
    });
    console.log(`Deleted ${counter} of ${snap.size} secrets`);
}

module.exports = { isExpired, deleteExpired };
