/**
 * Require the credentials that you entered in the .env file
 */
require('dotenv').config()

const EthereumTx = require('ethereumjs-tx')
const txDecoder = require('ethereum-tx-decoder');
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

export const broadcastTransaction = async (encodedTx) => {
    const decodedTx = txDecoder.decodeTx(encodedTx);

    const details = {
        "to": decodedTx.to,
        "value": decodedTx.value._hex,
        "gas":  decodedTx.gasLimit._hex,
        "gasPrice":  decodedTx.gasPrice._hex,
        "nonce":  decodedTx.nonce,
        "chainId": process.env.REACT_APP_TEST_MODE ? 3 : 1,
        "v": decodedTx.v,
        "r": decodedTx.r,
        "s": decodedTx.s
    }
    const updatedTx = new EthereumTx(details);
    const updatedTxSerialized = updatedTx.serialize();

    /**
     * Submit the raw transaction details to the provider configured above.
     */
    const transaction = await web3.eth.sendSignedTransaction('0x' + updatedTxSerialized.toString('hex') );

    /**
     * We now know the transaction ID, so let's build the public Etherscan url where
     * the transaction details can be viewed.
     */
    const url = `https://ropsten.etherscan.io/tx/${transaction.transactionHash}`
    
    window.console.log('URL: ', url);

    window.console.log(`Note: please allow for 30 seconds before transaction appears on Etherscan`);

    return transaction;
}

