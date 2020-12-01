/**
 * Require the credentials that you entered in the .env file
 */
require('dotenv').config()

const EthereumTx = require('ethereumjs-tx')
const txDecoder = require('ethereum-tx-decoder');


export const signTransaction = async (encodedTx) => {
    const decodedTx = txDecoder.decodeTx(encodedTx);

    const details = {
        "to": decodedTx.to,
        "value": decodedTx.value._hex,
        "gas":  decodedTx.gasLimit._hex,
        "gasPrice":  decodedTx.gasPrice._hex,
        "nonce":  decodedTx.nonce,
        "chainId": process.env.REACT_APP_TEST_MODE ? 3 : 1
    }
    const updatedTx = new EthereumTx(details);

    updatedTx.sign( Buffer.from(process.env.REACT_APP_WALLET_PRIVATE_KEY, 'hex') )
    const updatedTxSerialized = updatedTx.serialize()

    return updatedTxSerialized;
}
