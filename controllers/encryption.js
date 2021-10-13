const crypto = require("crypto");

const password = process.env.PASSWORD;
const algorithm = process.env.ALGORITHM;
const salt = process.env.SALT;

const key = crypto.scryptSync(password, salt, 24);

function encrypt(text) {
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decrypt(text) {
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = cipher.update(text, "hex", "utf8");
    decrypted += cipher.final("utf8");
    return decrypted;
}

async function hashedPassword(pw) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString("hex");
        crypto.scrypt(pw, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString("hex"));
        });
    });
}

async function verifyPassword(pw, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        crypto.scrypt(pw, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString("hex"));
        });
    });
}
module.exports = { encrypt, decrypt, hashedPassword, verifyPassword };
