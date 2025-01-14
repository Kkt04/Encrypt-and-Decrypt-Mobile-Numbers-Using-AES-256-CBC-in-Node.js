crypto = require('crypto');

// Sample JSON array
const jsonData = [
    {
        mobile: 9812345678,
        first_name: 'Arvind'
    },
    {
        mobile: 7612345678,
        first_name: 'Krishna'
    }
];

// Function to encrypt a mobile number using AES-256-CBC
function encryptMobile(mobile) {
    const key = 'your_secret_key'; // Replace with your actual secret key
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(mobile.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { iv: iv.toString('hex'), encrypted };
}

// Function to decrypt a mobile number using AES-256-CBC
function decryptMobile(encrypted, iv) {
    const key = 'your_secret_key'; // Replace with your actual secret key

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// Encrypt mobile numbers in the JSON array
const encryptedData = jsonData.map(person => ({
    ...person,
    encryptedMobile: encryptMobile(person.mobile)
}));

console.log('Encrypted data:', encryptedData);

// Decrypt mobile numbers from the encrypted JSON array
const decryptedData = encryptedData.map(person => ({
    ...person,
    mobile: decryptMobile(person.encryptedMobile.encrypted, person.encryptedMobile.iv)
}))



;

console.log('Decrypted data:', decryptedData);