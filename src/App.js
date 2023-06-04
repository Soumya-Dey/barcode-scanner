import { useState } from 'react';
// import axios from 'axios';

import './App.css';

function App() {
  const [barcode, setBarcode] = useState('');
  const [barcodeScanned, setBarcodeScanned] = useState('');
  const [codes, setCodes] = useState([]);
  const [suffix, setSuffix] = useState('aA');
  const [machine, setMachine] = useState(-1);

  const barcodeAutoFocus = () => {
    document.getElementById('barcode').focus();
  };

  const onChangeBarcode = (event) => {
    setBarcode(event.target.value);
  };

  const onKeyPressBarcode = async (event) => {
    if (event.key === 'Enter' || event.keyCode === 17 || event.keyCode === 74) {
      if (event.keyCode === 17 || event.keyCode === 74) event.preventDefault();

      const [code, suffix] = event.target.value
        ? event.target.value.split('-')
        : barcodeScanned.split('-');
      setBarcodeScanned(event.target.value || barcodeScanned);
      setSuffix(suffix);

      let machine = -1;
      if (suffix === 'aA') machine = event.key === 'Enter' ? 1 : 2;
      else if (suffix === 'aa') machine = event.key === 'Enter' ? 3 : 4;
      else if (suffix === 'AA') machine = event.key === 'Enter' ? 5 : 6;
      else if (suffix === 'Aa') machine = event.key === 'Enter' ? 7 : 8;
      setMachine(machine);

      setBarcode('');
      setCodes([...codes, { code, suffix, machine }]);

      // SEND AN API REQUEST
    }
    console.log({ event });
  };

  return (
    <div className='App'>
      <input
        autoFocus={true}
        placeholder='Start Scanning'
        value={barcode}
        onChange={onChangeBarcode}
        id='barcode'
        className='barcode'
        onKeyDown={onKeyPressBarcode}
        onBlur={barcodeAutoFocus}
      />
      <h1>BARCODE SCANNER</h1>
      <table className='codes'>
        <thead>
          <tr>
            <th>CODE</th>
            <th>SUFFIX</th>
            <th>MACHINE</th>
          </tr>
        </thead>
        <tr>
          <td>{barcodeScanned.split('-')[0]}</td>
          <td>{suffix}</td>
          <td>{machine}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
