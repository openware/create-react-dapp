# Getting Started with Create React dApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts:

In the project directory, you can run:
   
### `npm install` or `yarn`

Need to install all packages first of all. This is required.   
Installed packages placed in `node_modules` folder.   

### `touch .env`

Fill ```.env.development```. Check ```.env.example```

```
# Testnet / Mainnet switcher (true - ropsten, false - mainnet)   
REACT_APP_TEST_MODE=true   
   
# YOUR INFURA PROJECT ID   
REACT_APP_INFURA_ACCESS_TOKEN=xxxxxx   
    
# Credentials of the sender    
REACT_APP_WALLET_ADDRESS=xxxxxx   
REACT_APP_WALLET_PRIVATE_KEY=xxxxxx   
    
# Address of the receiver   
REACT_APP_DESTINATION_WALLET_ADDRESS=xxxxxx    
```
   
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Transaction scripts:
```
./src/scripts/prepare-transaction.js
```
Script creates a file ```data.dat``` with serialized transaction inside placed in ```data``` directory

```
./src/scripts/sign-transaction.js
```
Script signs transaction from ```data/data.dat```. Can be changed with other script you prefer.

```
./src/scripts/broadcast-transaction.js
```
Script send raw transaction from ```data/signed-data.dat``` to the blockchain.
   
