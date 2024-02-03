import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    if (privateKey) {
      const {
        data: { balance, address },
      } = await server.get(`balance/${privateKey}`);
      setBalance(balance);
      setAddress(address);
    } else {
      setBalance(0);
      setAddress("");
    }
  }

  return (
    <div className="container wallet">
      <h1>Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="address">ADDRESS: {address}</div>
      <div className="balance">BALANCE: {balance}</div>
    </div>
  );
}

export default Wallet;