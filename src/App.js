import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [barcode, setBarcode] = useState('');

  const barcodeAutoFocus = () => {
    document.getElementById('barcode').focus();
  };

  const onChangeBarcode = (event) => {
    setBarcode(event.target.value);
  };

  const onKeyPressBarcode = async (event) => {
    if (event.key == 'Enter') {
      setBarcode(event.target.value);
      alert(`Sannning Done\nBARCODE: ${event.target.value}`);

      // const { data } = await axios({
      //   method: 'post',
      // });
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
      {/* <input type='text' id='one' onKeyDown={handleKeyPress} /> */}
    </div>
  );
}

export default App;
