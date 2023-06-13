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
      // url: 'http://139.59.137.146:8000/srv/scan',
      url: 'https://api.bterpx.com/srv/scan',
      method: 'patch',
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZjUwZWE4MDYxNTZiZWY1NDcyY2Q5IiwiY2xpZW50SWQiOiI2NDdmNTBlYTgwNjE1NmJlZjU0NzJjZDgiLCJyb2xlIjoiZGlyZWN0b3IifSwiaWF0IjoxNjg2NjQ5NjUyLCJleHAiOjE2ODc1MTM2NTJ9.F5AQOcDYSr6N2uTzce-b3M1twSkcvwYXMFfJvvnI6I8',
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
