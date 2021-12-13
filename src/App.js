import { useState, useEffect } from 'react';
import './App.css';

import { useUserContext } from './userContext';

import { Contact } from './Contact';
function App() {
  return (
    <div className='row'>
      <div className='col-md-10 mx-auto offset-md-1'>
        <Contact />
      </div>
    </div>
  );
}

export default App;
