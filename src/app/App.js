import './App.scss';
import { Header } from '../components/Header';
import { TransactionCreator } from '../components/TransactionCreator';
import { GasPrices } from '../components/GasPrices';

function App() {
  return (
    <div className="App">
      <Header />
      <GasPrices />
      <TransactionCreator />
    </div>
  );
}

export default App;
