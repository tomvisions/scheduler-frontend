import * as forge from "node-forge"

var key = forge.random.getBytesSync(16);
var iv = forge.random.getBytesSync(8);
var cipher = forge.rc2.createEncryptionCipher(key);
/*
cipher.start(iv);
cipher.update(forge.util.createBuffer("hello how are you"));
cipher.finish();

var encrypted = cipher.output;
// outputs encrypted hex
console.log(encrypted.toHex());

// decrypt some bytes
var cipher = forge.rc2.createDecryptionCipher(key);
cipher.start(iv);
cipher.update(encrypted);
cipher.finish();
// outputs decrypted hex
console.log(cipher.output.toHex());
*/
export const encryptMessage = async (message:string) => {
    var md = forge.md.sha512.create();
    md.update(message);

    return md.digest().toHex();
}
/*    console.log(md.digest().toHex());
    // generate a random key and IV
// Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
var key = forge.random.getBytesSync(16);
var iv = forge.random.getBytesSync(16);

console.log('iv');
console.log(iv)
console.log('key');
console.log(key)

/* alternatively, generate a password-based 16-byte key
var salt = forge.random.getBytesSync(128);
var key = forge.pkcs5.pbkdf2('password', salt, numIterations, 16);
*/

// encrypt some bytes using CBC mode
// (other modes include: ECB, CFB, OFB, CTR, and GCM)
// Note: CBC and ECB modes use PKCS#7 padding as default 
/*
var cipher = forge.cipher.createCipher('AES-CBC', key);
cipher.start({iv: iv});
cipher.update(forge.util.createBuffer(message));
cipher.finish();
var encrypted = cipher.output;
// outputs encrypted hex
console.log(encrypted.toHex());

// decrypt some bytes using CBC mode
// (other modes include: CFB, OFB, CTR, and GCM)
var decipher = forge.cipher.createDecipher('AES-CBC', key);
decipher.start({iv: iv});
decipher.update(encrypted);
var result = decipher.finish(); // check 'result' for true/false
// outputs decrypted hex
console.log(decipher.output.data);
console.log(decipher.output.toHex());

// decrypt bytes using CBC mode and streaming
// Performance can suffer for large multi-MB inputs due to buffer
// manipulations. Stream processing in chunks can offer significant
// improvement. CPU intensive update() calls could also be performed with
// setImmediate/setTimeout to avoid blocking the main browser UI thread (not
// shown here). Optimal block size depends on the JavaScript VM and other
// factors. Encryption can use a simple technique for increased performance.
var encryptedBytes = encrypted.bytes();
var decipher = forge.cipher.createDecipher('AES-CBC', key);
decipher.start({iv: iv});
var length = encryptedBytes.length;
var chunkSize = 1024 * 64;
var index = 0;
var decrypted = '';
do {
  decrypted += decipher.output.getBytes();
  var buf = forge.util.createBuffer(encryptedBytes.substr(index, chunkSize));
  decipher.update(buf);
  index += chunkSize;
} while(index < length);
var result = decipher.finish();

decrypted += decipher.output.getBytes();
console.log(forge.util.bytesToHex(decrypted));
}
/*
// encrypt some bytes using GCM mode
var cipher = forge.cipher.createCipher('AES-GCM', key);
cipher.start({
  iv: iv, // should be a 12-byte binary-encoded string or byte buffer
  additionalData: 'binary-encoded string', // optional
  tagLength: 128 // optional, defaults to 128 bits
});
cipher.update(forge.util.createBuffer(someBytes));
cipher.finish();
var encrypted = cipher.output;
var tag = cipher.mode.tag;
// outputs encrypted hex
console.log(encrypted.toHex());
// outputs authentication tag
console.log(tag.toHex());

// decrypt some bytes using GCM mode
var decipher = forge.cipher.createDecipher('AES-GCM', key);
decipher.start({
  iv: iv,
  additionalData: 'binary-encoded string', // optional
  tagLength: 128, // optional, defaults to 128 bits
  tag: tag // authentication tag from encryption
});
decipher.update(encrypted);
var pass = decipher.finish();
// pass is false if there was a failure (eg: authentication tag didn't match)
if(pass) {
  // outputs decrypted hex
  console.log(decipher.output.toHex());
}
}
/*   
  
    //  const key = await generateKey();
      let encoded = getMessageEncoding(message);
      // The iv must never be reused with a given key.
//      iv = window.crypto.getRandomValues(new Uint8Array(16));
      ciphertext = await window.crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv
        },
        key,
        encoded
      );
        console.log('the iv');
        console.log(iv);
      //  return ciphertext.
      let buffer = new Uint8Array(ciphertext, 0, 5);
      return buffer;  
    
    //  const ciphertextValue = document.querySelector(".aes-cbc .ciphertext-value");
      //ciphertextValue.classList.add('fade-in');
      //ciphertextValue.addEventListener('animationend', () => {
      //  ciphertextValue.classList.remove('fade-in');
    //  });
     // ciphertextValue.textContent = `${buffer}...[${ciphertext.byteLength} bytes total]`;
    
    
    }


/*
Fetch the contents of the "message" textbox, and encode it
in a form we can use for the encrypt operation.
*//*
const getMessageEncoding = (message:string) => {
  let enc = new TextEncoder();
  return enc.encode(message);
}

/*
Get the encoded message, encrypt it and display a representation
of the ciphertext in the "Ciphertext" element.
*//*
const encryptMessage = async (key:any, message:string) => {

//  const key = await generateKey();
  let encoded = getMessageEncoding(message);
  // The iv must never be reused with a given key.
  iv = window.crypto.getRandomValues(new Uint8Array(16));
  ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv
    },
    key,
    encoded
  );
    console.log('the iv');
    console.log(iv);
  //  return ciphertext.
  let buffer = new Uint8Array(ciphertext, 0, 5);
  return buffer;  

//  const ciphertextValue = document.querySelector(".aes-cbc .ciphertext-value");
  //ciphertextValue.classList.add('fade-in');
  //ciphertextValue.addEventListener('animationend', () => {
  //  ciphertextValue.classList.remove('fade-in');
//  });
 // ciphertextValue.textContent = `${buffer}...[${ciphertext.byteLength} bytes total]`;


}
/*
export const decryptMessage = (key:CryptoKey, message:amy) =>  {
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv
      },
      key,
      message
    );
  
    let dec = new TextDecoder();
    return decrypted
  }  */
/*
export const generateKey = async() => {
  const too =  await window.crypto.subtle.generateKey(
        {
            name: "AES-CBC",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
      );
      console.log('too');
  console.log(too);    
  const enc = await encryptMessage(too, "hello this is cool")
  console.log('encrypted');
  console.log(enc);

}
/*
Fetch the ciphertext and decrypt it.
Write the decrypted message into the "Decrypted" box.
*//*
export const decryptMessage = (key:CryptoKey) =>  {
  let decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv
    },
    key,
    ciphertext
  );

  let dec = new TextDecoder();
  return decrypted
} */

/*
Generate an encryption key, then set up event listeners
on the "Encrypt" and "Decrypt" buttons.
*/


/*
.then((key) => {
  const encryptButton = document.querySelector(".aes-cbc .encrypt-button");
  encryptButton.addEventListener("click", () => {
    encryptMessage(key);
  });

  const decryptButton = document.querySelector(".aes-cbc .decrypt-button");
  decryptButton.addEventListener("click", () => {
    decryptMessage(key);
  });
});

})();*/