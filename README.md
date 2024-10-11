# How to run the project
You need to have foundry and node installed on your machine. More details about installing are present in README files of contracts and frontend respectively.

You need to run the local blockchain (anvil), deploy the smart contract and run the frontend.
This will require atleast 2 terminals.

## Running the contracts
```bash
cd contracts/
```  
Split terminal into 2.   
Terminal 1 : Spin up local chain using: 
```bash
anvil
```
This should spin up the local chain.   
Terminal 2 : Deploy the contract to local chain using the following command:
```bash
forge script script/Deploy.s.sol --fork-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```
The private key can be replaced by any key provided by anvil.

If successful, it will deploy the contract to our local chain. It will also provide the contract address on the terminal where the script was deployed. Default is "0x5FbDB2315678afecb367f032d93F642f64180aa3".

## Running the frontend

```bash
cd frontend/
```
Install the packages 
```bash
npm install
```

If the contract address is not "0x5FbDB2315678afecb367f032d93F642f64180aa3", change it in ./src/utils/contract.js.

Run the frontend
```bash
npm run start
```

## Interacting on the browser
1) Make sure Metamask is installed and connected to localhost (anvil). If the network is not present, add the network using the details provided by anvil.

2) Import an anvil account using the private key provided by anvil. This will be used to sign transactions.

3) Go to http://localhost:3000/ and interact with the contract.

4) Demo images of the frontend are present in ./DemoImages folder.