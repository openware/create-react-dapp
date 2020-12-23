import * as React from 'react';
import * as RB from 'react-bootstrap';
import { getMyWalletBalance } from '../../scripts/prepare-transaction';

export const BalanceComponent = props => {
    const [balance, setBalance] = React.useState('');

    React.useEffect(() => {
        async function fetchBalance() {
            const updatedBalance = await getMyWalletBalance();
            setBalance(updatedBalance);
        }

        fetchBalance();
    },[])

    const percentageArray = [ 10, 25, 50, 75 ];

    const percentageBlock = percentage => (
        <RB.Col className="justify-content-md-center px-1">
            <RB.Button
                variant="outline-primary"
                onClick={() => props.handleChangeAmount(percentage * balance / 100)}
                className="w-100"
            >
                {percentage} %
            </RB.Button>
        </RB.Col>
    );

    return (
        <RB.Container className="mt-2">
            <RB.Row className="justify-content-md-center mb-2">
                {percentageArray.map(percentageBlock)}
            </RB.Row>
            <RB.Row className="justify-content-md-start">
                <span>Balance: {balance} <b>ETH</b></span>
            </RB.Row>
        </RB.Container>
    )
}
