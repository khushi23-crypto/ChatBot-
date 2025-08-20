import './App.css';
import Background from './components/Background';
import ChatWindow from './components/ChatWindow';
import Navigationbar from './components/Navigationbar';

function App() {
  return (
    <div className="App">
      <Navigationbar/>
      <Background/>
      <ChatWindow/>
    </div>
  );
}

export default App;
