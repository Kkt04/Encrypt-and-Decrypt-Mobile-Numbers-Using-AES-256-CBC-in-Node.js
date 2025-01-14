const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);  
const iv = crypto.randomBytes(16);  

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const data = [
    {
        mobile: 9812345678,
        first_name: 'Arvind'
    },
    {
        mobile: 7612345678,
        first_name: 'Krishna'
    }
];
const encryptedData = data.map(item => {
    return {
        ...item,
        mobile: encrypt(item.mobile.toString()) 
    };
});
console.log("Encrypted Data:");
console.log(JSON.stringify(encryptedData, null, 2));

const decryptedData = encryptedData.map(item => {
    return {
        ...item,
        mobile: decrypt(item.mobile)  
    };
});
console.log("\nDecrypted Data:");
console.log(JSON.stringify(decryptedData, null, 2));
