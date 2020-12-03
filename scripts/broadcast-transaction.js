/**
 * Require the credentials that you entered in the .env file
 */
require('dotenv').config()

const ansi = require('ansicolor').nice
const EthereumTx = require('ethereumjs-tx')
const fs = require('fs')
const log = require('ololog').configure({ time: true })
const txDecoder = require('ethereum-tx-decoder');
const Web3 = require('web3')


/**
 * Network configuration
 */
const mainnet = `https://mainnet.infura.io/${process.env.INFURA_ACCESS_TOKEN}`
const testnet = `https://ropsten.infura.io/v3/${process.env.INFURA_ACCESS_TOKEN}`

/**
 * Change the provider that is passed to HttpProvider to `mainnet` for live transactions.
 */
const networkToUse = process.env.TEST_MODE ? testnet : mainnet
const web3 = new Web3( new Web3.providers.HttpProvider(networkToUse) )

const broadcastTransaction = async () => {
    const encodedTx = fs.readFileSync('./data/signed-data.dat');
    const decodedTx = txDecoder.decodeTx(encodedTx);

    const details = {
        "to": decodedTx.to,
        "value": decodedTx.value._hex,
        "gas":  decodedTx.gasLimit._hex,
        "gasPrice":  decodedTx.gasPrice._hex,
        "nonce":  decodedTx.nonce,
        "chainId": process.env.TEST_MODE ? 3 : 1,
        "v": decodedTx.v,
        "r": decodedTx.r,
        "s": decodedTx.s
    }
    const updatedTx = new EthereumTx(details);
    const updatedTxSerialized = updatedTx.serialize();

    /**
     * Submit the raw transaction details to the provider configured above.
     */
    const transactionId = web3.eth.sendRawTransaction('0x' + updatedTxSerialized.toString('hex') )

    /**
     * We now know the transaction ID, so let's build the public Etherscan url where
     * the transaction details can be viewed.
     */
    const url = `https://ropsten.etherscan.io/tx/${transactionId}`
    log(url.cyan)

    log(`Note: please allow for 30 seconds before transaction appears on Etherscan`.magenta)

    process.exit()
}

broadcastTransaction()
