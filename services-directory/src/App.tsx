import { useState } from 'react';
import Sidebar from './Sidebar';
import Autocomplete from './Autocomplete';
import './App.css';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState('');

  return (
    <div className='app'>
      <Sidebar />

      <main className='content'>
        <Autocomplete onSelectItem={setSelectedProduct} />

        {selectedProduct && <p>Selected product: {selectedProduct}</p>}

        <h1>Welcome</h1>
        <p>Find the services you need.</p>

        <div className='cards'>
          <div className='card'>
            <h3>House Cleaning</h3>
            <p>Cleaning</p>
          </div>

          <div className='card'>
            <h3>Home Cooking</h3>
            <p>Cooking</p>
          </div>

          <div className='card'>
            <h3>Plumbing Repair</h3>
            <p>Plumbing</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
