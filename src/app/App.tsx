
import React from 'react'
import './App.scss';
import { Header } from '../components/Header';
import { TransactionCreator } from '../components/TransactionCreator';
import { GasPrices } from '../components/GasPrices';
import { MetaMaskButton } from '../components/MetaMaskButton';

function App() {
    return (
        <div className="App">
            <Header />
            <GasPrices />
            <TransactionCreator />
            <MetaMaskButton />
        </div>
    );
}

export default App;
