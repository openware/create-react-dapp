Guide:
```
npm install or yarn
touch .env
```

Fill ```.env```. Check ```.env.example```

```
# Testnet / Mainnet switcher (true - ropsten, false - mainnet)
TEST_MODE=true

# YOUR INFURA PROJECT ID
INFURA_ACCESS_TOKEN=xxxxxx
 
# Credentials of the sender
WALLET_ADDRESS=xxxxxx
WALLET_PRIVATE_KEY=xxxxxx
 
# Address of the receiver
DESTINATION_WALLET_ADDRESS=xxxxxx
```

# Scripts:
```
babel-node ./scripts/prepare-transaction.js
```
Script creates a file ```data.dat``` with serialized transaction inside placed in ```data``` directory

if command doesn\'t work (optional)
```
npm install -g babel-cli
``` 

```
babel-node ./scripts/sign-transaction.js
```
Script signs transaction from ```data/data.dat```. Can be changed with other script you prefer.

```
babel-node ./scripts/broadcast-transaction.js
```
Script send raw transaction from ```data/signed-data.dat``` to the blockchain.
