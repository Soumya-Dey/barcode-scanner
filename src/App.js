import { useState } from 'react';
import EventEmitter from 'events';
import axios from 'axios';

import './App.css';

let keys = [];
// instantiatating the EventEmitter
const eventHandler = new EventEmitter();
eventHandler.on('keydown', (...args) => {
  setTimeout(async () => {
    console.log({ keys });

    const { data } = await axios({
      url: 'http://139.59.137.146:8000/srv/scan',
      method: 'patch',
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZjUwYzc2Yzk0YWIxOWRiYjU3NTViIiwiY2xpZW50SWQiOiI2NDdmNTBjNzZjOTRhYjE5ZGJiNTc1NWEiLCJyb2xlIjoiZGlyZWN0b3IifSwiaWF0IjoxNjg2NTU5NjIzLCJleHAiOjE2ODc0MjM2MjN9.mkYxvW-kVXOkhaTVPEmBQpSEvGuRa_8mCH65dXvYw5A',
      },
      data: {
        keys,
      },
    });
    console.log({ data });
    keys = [];
  }, 1000);
});

const App = () => {
  const [barcode, setBarcode] = useState('');

  const barcodeAutoFocus = () => {
    document.getElementById('barcode').focus();
  };

  const onChangeBarcode = (event) => {
    setBarcode(
      event.target.value +
        `${event.target.value.toLowerCase().endsWith('aa') ? ', ' : ''}`
    );
  };

  const onKeyPressBarcode = async (event) => {
    keys = [...keys, event.key];

    if (event.keyCode === 17 || event.keyCode === 74) event.preventDefault();
    if (event.key === 'Enter') eventHandler.emit('keydown');

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
      <p>{barcode}</p>
    </div>
  );
};

export default App;
