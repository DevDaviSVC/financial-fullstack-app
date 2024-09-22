export default function generateRandomId (length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#$%&*";
    let generatedId = "";

    for (let i = 0; i < length; i++) {
        let character = characters[Math.trunc(Math.random() * (characters.length - 1))];
        generatedId += character;
    }

    return generatedId;
}