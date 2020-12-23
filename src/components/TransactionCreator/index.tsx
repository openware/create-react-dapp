import * as React from 'react';
import * as RB from 'react-bootstrap';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { broadcastTransaction } from '../../scripts/broadcast-transaction';
import { prepareTransaction } from '../../scripts/prepare-transaction';
import { signTransaction } from '../../scripts/sign-transaction';
import { BalanceComponent } from '../Balance';
import './style.scss';

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
                <RB.Row className="justify-content-md-center mb-7">
                    <div className="form">
                        <RB.Col>
                            <RB.InputGroup className="mb-3 mw-50">
                                <RB.FormControl
                                    placeholder="Enter amount to send"
                                    aria-label="Amount to send"
                                    aria-describedby="basic-addon2"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                                <RB.InputGroup.Append>
                                    <RB.InputGroup.Text id="basic-addon2">ETH</RB.InputGroup.Text>
                                </RB.InputGroup.Append>
                            </RB.InputGroup>
                            <BalanceComponent handleChangeAmount={setAmount}/>
                            <RB.Button
                                onClick={handlePrepareTransaction}
                                variant="primary"
                                className="w-100"
                            >
                                Send
                            </RB.Button>
                        </RB.Col>
                    </div>
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
