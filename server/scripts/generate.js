const secp = require("ethereum-cryptography/secp256k1");
// const { createPrivateKeySync } = require("ethereum-cryptography/secp256k1-compat");
// const { getRandomBytesSync } = require("ethereum-cryptography/random.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
// const privateKey = createPrivateKeySync();

const publicKey = secp.getPublicKey(privateKey);

const walletAddress = keccak256(publicKey.slice(1)).slice(-20);
console.log('private key: ', toHex(privateKey));
console.log('public key: ', toHex(publicKey));
console.log('wallet: ', toHex(walletAddress));


// const { randomPrivateKey, getPublicKey } = require("ethereum-cryptography/secp256k1-compat");
// const { keccak256, toHex } = require("ethereum-cryptography/utils");

// const privateKey = randomPrivateKey();
// const publicKey = getPublicKey(privateKey);
// const publicKeyHex = toHex(publicKey);

// const walletAddress = keccak256(publicKeyHex).slice(-20);

// console.log('private: ', privateKey.toString('hex'));
// console.log('public: ', publicKeyHex);
// console.log('wallet: ', walletAddress);