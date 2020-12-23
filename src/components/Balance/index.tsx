import * as React from 'react';
import * as RB from 'react-bootstrap';
import { getMyWalletBalance } from '../../scripts/prepare-transaction';

interface Props {
    handleChangeAmount: (value: string) => void;
    account?: string | null;
}

export const BalanceComponent = (props: Props) => {
    const [balance, setBalance] = React.useState('');
    const { account } = props;

    React.useEffect(() => {
        async function fetchBalance() {
            const updatedBalance = await getMyWalletBalance(account);
            setBalance(updatedBalance);
        }

        fetchBalance();
    },[account])

    const percentageArray = [ 10, 25, 50, 75 ];

    const percentageBlock = (percentage: number, index: number) => (
        <RB.Col className="justify-content-md-center px-1" key={index}>
            <RB.Button
                variant="outline-primary"
                onClick={() => props.handleChangeAmount(String(percentage * +balance / 100))}
                className="w-100"
            >
                {percentage} %
            </RB.Button>
        </RB.Col>
    );

    return (
        <RB.Container className="mt-2 mb-5">
            <RB.Row className="justify-content-md-center mb-2">
                {percentageArray.map(percentageBlock)}
            </RB.Row>
            <RB.Row className="justify-content-between">
                <span>Balance: </span><span>{balance} <b>ETH</b></span>
            </RB.Row>
        </RB.Container>
    )
}
