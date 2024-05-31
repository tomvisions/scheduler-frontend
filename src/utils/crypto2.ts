//const { createHmac, crypto as cryptoObject } = require('node:crypto');
crypto.getRandomValues
const secret = 'abcdefg';
const hash = cryptoObject.createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);

export interface cryptoOptions {
   iv: string
   encryptedData: string
}
// Prints:
SubtleCrypto.encrypt()
window.crypto.

window.crypto.encrypt
//Checking the crypto module
//const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = cryptoObject.randomBytes(32);
const iv = cryptoObject.randomBytes(16);

//Encrypting text
export const encrasypt = (text:string) : cryptoOptions => {
   let cipher = cryptoObject.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
export const  decsrypt = (text:cryptoOptions) : string => {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = cryptoObject.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Text send to encrypt function
var hw = encrypt("Welcome to Tutorials Point...")
console.log(hw)
console.log(decrypt(hw))