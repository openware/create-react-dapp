import * as React from 'react';
import * as RB from 'react-bootstrap';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { broadcastTransaction } from '../../scripts/broadcast-transaction';
import { prepareTransaction } from '../../scripts/prepare-transaction';
import { signTransaction } from '../../scripts/sign-transaction';

export const TransactionCreator = () => {
    const { account } = useWeb3ReactCore<Web3Provider>();
    const [isTxLoading, setIsTxLoading] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    const [executedTxId, setExecutedTxId] = React.useState(undefined);

    const handlePrepareTransaction = () => {
        setIsTxLoading(true)
        setExecutedTxId(undefined)

        prepareTransaction(amount, account).then(preparedTx =>
            signTransaction(preparedTx).then(signedTx =>
                broadcastTransaction(signedTx).then(executedTx => {
                        setExecutedTxId(executedTx.transactionHash);
                        setIsTxLoading(false);

                        return;
                    }
                )
            )
        );
    }

    return (
        <div className="transaction-creator">
            <RB.Container>
                <h3>Transaction creator</h3>
                <RB.Row className="justify-content-md-center">
                    <RB.Col xs lg="6">
                        <RB.InputGroup className="mb-3 mw-50">
                            <RB.InputGroup.Prepend>
                                <RB.InputGroup.Text id="basic-addon2">ETH</RB.InputGroup.Text>
                            </RB.InputGroup.Prepend>
                            <RB.FormControl
                                placeholder="Enter amount to send"
                                aria-label="Amount to send"
                                aria-describedby="basic-addon2"
                                onChange={e => setAmount(e.target.value)}
                            />
                            <RB.InputGroup.Append>
                                <RB.Button
                                    onClick={handlePrepareTransaction}
                                    variant="outline-secondary"
                                >
                                    Send
                                </RB.Button>
                            </RB.InputGroup.Append>
                        </RB.InputGroup>
                    </RB.Col>
                </RB.Row>
                {executedTxId ? (
                    <RB.Row className="justify-content-md-center">
                        <a
                            href={`https://ropsten.etherscan.io/tx/${executedTxId}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {`https://ropsten.etherscan.io/tx/${executedTxId}`}
                        </a>
                    </RB.Row>
                ) : null}
                {isTxLoading ? (
                    <RB.Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </RB.Spinner>
                ) : null}
            </RB.Container>
        </div>
    )
}
