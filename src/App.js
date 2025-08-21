import Background from './components/Background';
import ChatBox from './components/Chatbox/ChatBox';
import Navigationbar from './components/Navigationbar';
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'
function App() {
  return (
    <div className="App">
      <Navigationbar />
      <Background />
      <div className='main-content'>
        <Sidebar />
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
