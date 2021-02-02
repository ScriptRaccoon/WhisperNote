const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

async function addNote(text) {
    const id = uuidv4();
    const now = new Date().toLocaleString();
    const data = JSON.stringify({ id, text, created: now });
    try {
        fs.writeFileSync(`./notes/${id}`, data);
        return id;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function readNote(id) {
    try {
        const data = fs.readFileSync(`./notes/${id}`, { encoding: "utf8" });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function deleteNote(id) {
    try {
        fs.unlinkSync(`./notes/${id}`);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { addNote, readNote, deleteNote };
