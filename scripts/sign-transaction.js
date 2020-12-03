/**
 * Require the credentials that you entered in the .env file
 */
require('dotenv').config()

const ansi = require('ansicolor').nice
const EthereumTx = require('ethereumjs-tx')
const fs = require('fs')
const log = require('ololog').configure({ time: true })
const txDecoder = require('ethereum-tx-decoder');


const signTransaction = async () => {
    const encodedTx = fs.readFileSync('./data/data.dat');
    const decodedTx = txDecoder.decodeTx(encodedTx);

    const details = {
        "to": decodedTx.to,
        "value": decodedTx.value._hex,
        "gas":  decodedTx.gasLimit._hex,
        "gasPrice":  decodedTx.gasPrice._hex,
        "nonce":  decodedTx.nonce,
        "chainId": process.env.TEST_MODE ? 3 : 1
    }
    const updatedTx = new EthereumTx(details);

    updatedTx.sign( Buffer.from(process.env.WALLET_PRIVATE_KEY, 'hex') )
    const updatedTxSerialized = updatedTx.serialize()

    log(`Transaction successfully signed`.blue)

    fs.writeFileSync('./data/signed-data.dat', updatedTxSerialized)

    process.exit()
}

signTransaction()
