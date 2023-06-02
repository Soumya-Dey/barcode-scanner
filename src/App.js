import { useState } from 'react';
// import axios from 'axios';

import './App.css';

function App() {
  const [barcode, setBarcode] = useState('');
  const [codes, setCodes] = useState([]);

  const barcodeAutoFocus = () => {
    document.getElementById('barcode').focus();
  };

  const onChangeBarcode = (event) => {
    setBarcode(event.target.value);
  };

  const onKeyPressBarcode = async (event) => {
    if (event.key === 'Enter') {
      const [code, suffix] = event.target.value.split('@@@');

      alert(`Sannning Done\nBARCODE: ${code}\nSUFFIX: ${suffix}`);
      setBarcode('');
      setCodes([...codes, { code, suffix }]);

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
          </tr>
        </thead>
        {codes.map((code) => (
          <tr>
            <td>{code.code}</td>
            <td>{code.suffix}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
