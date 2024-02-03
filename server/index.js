const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "835c0bb95defd99790478a2a6d04ad1b0b292a6e": 100,
  "01802f6c1d110d352fa1b91a2aa777108f54f0cb": 50,
  "89f2a9c662cf6566749ac20c052a661df9c4957b": 75,
};

const privateKeys = {
  "a9b778fe61b2a70ea2ce98e9932ac20d0f4f9a91629c4cd7847f04d8c8bfb30e": "835c0bb95defd99790478a2a6d04ad1b0b292a6e",
  "666c1fa51d2df4165d0a9d583576a7a3262cc262a8754859c11815420a62b061": "01802f6c1d110d352fa1b91a2aa777108f54f0cb",
  "ef102ff140b88710819627e191ecceea177194767e4f204292847a867e8d7cb5": "89f2a9c662cf6566749ac20c052a661df9c4957b"
}

app.get("/balance/:privateKey", (req, res) => {
  const { privateKey } = req.params;
  const address = privateKeys[privateKey] || 0;
  const balance = balances[address] || 0;
  res.send({ balance, address });
});

app.post("/send", async (req, res) => {

  try {

  const { signature, hexMessage, recoveryBit, sender, recipient, amount } = req.body;

  // get signature, hash and recovery bit from client-sideand recover the address from signature

  const signaturePublicKey = secp.recoverPublicKey(hexMessage, signature, recoveryBit);
  const signatureAddressUint= keccak256(signaturePublicKey.slice(1)).slice(-20);
  const signatureAddress = toHex(signatureAddressUint);
  

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } 
  else if (signatureAddress !== sender) {
    res.status(400).send({message: "You are not the owner!"})
  }
  else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
} catch(error){
  console.log(error);
}
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}