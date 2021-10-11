const { firestore } = require("./firebase.js");

function isExpired(doc) {
    const secret = doc.data();
    const now = new Date();
    const then = secret.created.toDate();
    const hoursPassed = (now - then) / (1000 * 60 * 60);
    return hoursPassed >= parseInt(secret.expires_in);
}

async function deleteExpired() {
    console.log("Check for expired secrets");
    let counter = 0;
    const snap = await firestore.collection("secrets").get();
    snap.forEach((doc) => {
        if (isExpired(doc)) {
            counter++;
            console.log(`Secret with id ${doc.id} is expired and therefore deleted`);
            doc.ref.delete();
        }
    });
    console.log(`Deleted ${counter} of ${snap.size} secrets`);
}

module.exports = { isExpired, deleteExpired };
