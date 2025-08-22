import Background from './components/Background';
import Navigationbar from './components/Navigationbar';
import ChatBox from './components/ChatBox/ChatBox';
import './App.css'
import React, { useState } from 'react';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="App">
      <Navigationbar darkMode={darkMode}
        setDarkMode={setDarkMode} />
      <div className='main-content' >
        <Background darkMode={darkMode}/>
        <ChatBox darkMode={darkMode} />
      </div>
    </div>

  );
}

export default App;
