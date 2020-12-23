/**
 * Require the credentials that you entered in the .env file
 */
require('dotenv').config()

const axios = require('axios')
const EthereumTx = require('ethereumjs-tx')
const Web3 = require('web3')

/**
 * Network configuration
 */
const mainnet = `https://mainnet.infura.io/${process.env.REACT_APP_INFURA_ACCESS_TOKEN}`
const testnet = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_ACCESS_TOKEN}`

/**
 * Change the provider that is passed to HttpProvider to `mainnet` for live transactions.
 */
const networkToUse = process.env.REACT_APP_TEST_MODE ? testnet : mainnet
const web3 = new Web3( new Web3.providers.HttpProvider(networkToUse) )


/**
 * Set the web3 default account to use as your public wallet address
 */
web3.eth.defaultAccount = process.env.REACT_APP_WALLET_ADDRESS


/**
 * Fetch the current transaction gas prices from https://ethgasstation.info/
 * 
 * @return {object} Gas prices at different priorities
 */
export const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10
    }

    return prices;
}

/**
 * This is the process that will run when you execute the program.
 */
export const prepareTransaction = async (amountToSend, account) => {
    /**
     * Fetch the balance of the destination address
     */

    let destinationBalanceWei = await web3.eth.getBalance(process.env.REACT_APP_DESTINATION_WALLET_ADDRESS);
    let destinationBalance = await web3.utils.fromWei(destinationBalanceWei, 'ether');

    window.console.log(`Destination wallet balance is currently ${destinationBalance} ETH`)

    /**
     * Fetch your personal wallet's balance
     */
    let myBalanceWei = await web3.eth.getBalance(account || web3.eth.defaultAccount);
    let myBalance = await web3.utils.fromWei(myBalanceWei, 'ether');

    window.console.log(`Your wallet balance is currently ${myBalance} ETH`)


    /**
     * With every new transaction you send using a specific wallet address,
     * you need to increase a nonce which is tied to the sender wallet.
     */
    let nonce = await web3.eth.getTransactionCount(account || web3.eth.defaultAccount);
    window.console.log(`The outgoing transaction count for your wallet address is: ${nonce}`)


    /**
     * Fetch the current transaction gas prices from https://ethgasstation.info/
     */
    let gasPrices = await getCurrentGasPrices()

    const details = {
        "to": process.env.REACT_APP_DESTINATION_WALLET_ADDRESS,
        "value": web3.utils.toHex( web3.utils.toWei(amountToSend || '0', 'ether') ),
        "gas": 21000,
        "gasPrice": gasPrices.high * 1000000000, // converts the gwei price to wei
        "nonce": nonce,
        "chainId": process.env.REACT_APP_TEST_MODE ? 3 : 1 // EIP 155 chainId - mainnet: 1, ropsten: 3
    }
    const transaction = new EthereumTx(details)
    const serializedTransaction = transaction.serialize()

    return serializedTransaction;
}
