import * as React from 'react';
import * as RB from 'react-bootstrap';
import { getCurrentGasPrices } from '../../scripts/prepare-transaction';
import './style.scss';

export const GasPrices = () => {
    const [gasPrices, setGasPrices] = React.useState({ low: 0, medium: 0, high: 0 });

    React.useEffect(() => {
        async function fetchGasPrices() {
            const updatedGasPrices = await getCurrentGasPrices();
            setGasPrices(updatedGasPrices);
        }

        fetchGasPrices();
    },[])

    return (
        <div className="gas-prices">
            <RB.Container className="mt-5">
                <h3>Current gas prices</h3>
                <RB.Row className="justify-content-md-center mt-4 mb-5">
                    <RB.Col className="justify-content-md-center price-card">
                        <span style={{color: 'red'}}>Low: {gasPrices.low}</span>
                    </RB.Col>
                    <RB.Col className="justify-content-md-center price-card">
                        <span style={{color: 'orange'}}>Average: {gasPrices.medium}</span>
                    </RB.Col>
                    <RB.Col className="justify-content-md-center price-card">
                        <span style={{color: 'green'}}>High: {gasPrices.high}</span>
                    </RB.Col>
                </RB.Row>
            </RB.Container>
        </div>
    )
}
