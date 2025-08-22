import { ZIM } from 'zego-zim-web';
import React, { useState, useEffect, useRef } from 'react';
import bg from './assests/pexels-umkreisel-app-956999.jpg';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [zimInstance, setZimInstance] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [selectedUser, setSelectedUser] = useState('Kajal');

  const appID = 596685901;
  const tokenA = "04AAAAAGiqCJQADEAtDWFcv986FjHlDgCuCe2LQd9wtZaIadRLErolGFYhh6VYa/DDHKHkNrGy2sGlurX9LFe5W+4zoPYcRUJ8UHXa4B+R+QUrRk0qaD0CLgGVy4/Zco6CQ/sQ/iWwvVbH+xGMZmaT9aIf9+4jkYDCfmIZmjApmEgk7O5vch6WRMgsPURh+ZpuYtL38zWNVR2esoJSJRFYMosVdpejjjjoVrYszE6D6sUhNySJQAE8O+VNcjJc1eFyQwOihtPTAQ==";
  const tokenB = "04AAAAAGiqCK4ADJri5d0yW7YEcbj4VQCvu9MTZk37rzQMXQ7XY1ln4a/jBQ+/KSJIOqIMOqN3FtXXpiqRAealV5BWQVV4HMd1m8vIYF+TmH06CZVevxJS4zSDttdbWobg62QcvK5L3Unv+oMnJXa9VPHGvWAD0Ev54+j4BEQY5ULM1BbQGmWIh6hM/n/tZvCsNOfU8dXWLO43jOHIP/7qeklmRh5PZCqDKJ3PZmMvGiV8jR35gry29hiMy2DtR4dX3Ji0TKDxHQE=";
  const messageEndRef = useRef(null);

  useEffect(() => {
    const instance = ZIM.create(appID);
    setZimInstance(instance);
    instance.on('error', function (_instance, errorInfo) { }); instance.on('connectionStateChanged', function (zim, { state, event }) { });

    instance.on('peerMessageReceived', (_instance, { messageList }) => {
      setMessages(prev => [...prev,...messageList]);
    });

    instance.on('tokenWillExpire', (_instance, { second }) => {
      console.log('tokenWillExpire', second);


      instance.renewToken(selectedUser === "Kajal" ? tokenA : tokenB)
        .then(function () {

        })
        .catch(function (err) {

        })
    });

    return () => {
      instance.destroy();
    };
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleLogin = () => {
    const info = { userID: selectedUser, userName: selectedUser === "Kajal" ? "Kajal" : "Friend" };
    setUserInfo(info);
    const loginToken = selectedUser === "Kajal" ? tokenA : tokenB;
    if (zimInstance) {
      zimInstance.login(info, loginToken)
        .then(function () {
          setIsLogin(true);
          console.log("login in");
        })
        .catch(function (err) {
          console.log("login failed")
        });

    }
    else {
      console.log("instance error")
    }
  }
  const handleSendMessage = () => {
    if (!isLogin) return
    const toConversationID = selectedUser === 'Kajal' ? 'Friend' : 'Kajal';
    const conversationType = 0;
    const config = {
      priority: 1
    };

    var messageTextObj = {
      type: 1,
      message: messageText,
      extendedData: ''
    };

    zimInstance.sendMessage(messageTextObj, toConversationID, conversationType, config)
      .then(function ({ message }) {
        setMessages(prev => [...prev, message]);
      })
      .catch(function (err) {
        console.error(err);
      });
    setMessageText("");
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([],{
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return (
    <div className='p-[20px] w-full h-[100vh] flex items-center flex-col ' style={{ backgroundImage: `url(${bg})`, backgroundSize: "100% 100%" }}>
      <h1 className='text-white font-bold text-[30px] mt-10'>Real Time Chat App</h1>

      {
      !isLogin ? (
        <div className='w-[90%] max-w-[600px] h-[400px] p-[20px] shadow-2xl backdrop-blur bg-[#00000020] mt-[30px] rounded-xl flex flex-col items-center justify-center gap-[30px] border-2 border-gray-700'>
          <h1 className='text-2xl font-semibold text-white'>Select User</h1>
          <select className='px-[50px] py-[5px] rounded-xl bg-[#1f2525] text-white h-[6vh] flex justify-center'
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser} >
            <option value="Kajal">Kajal</option>
            <option value="Friend">Friend</option>
          </select>
          <button className='p-[10px] bg-white font-semibold text-black rounded-lg cursor-pointer w-[100px]'
            onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className='w-[90%] max-w-[800px] h-[600px] p-5 backdrop-blur shadow-2xl bg-[#00000020] mt-8 rounded-xl flex flex-col items-center gap-[30px] border-2 border-gray-700 overflow-auto'>
          <h2 className='text-white  text-[20px]'>
            {userInfo.userName} <span className='text-gray-400'>chatting with</span> {selectedUser === 'Kajal' ? 'Friend' : 'Kajal'}
          </h2>
          <div className='w-full h-[1px] bg-gray-800 '></div>
          <div className='rounded-2xl w-full p-[20px] flex flex-col gap-[10px] items-center h-[400px] overflo-auto'>
            {messages.map((msg, i) => {
              const isOwnMessage = msg.senderUserID === userInfo.userID;
              return (
                <div key={i} className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-[20px] py-[10px] shadow-lg text-white ${isOwnMessage
                    ? 'bg-[#0f1010] text-white rounded-br-none rounded-t-2xl rounded-bl-2xl'
                    : 'bg-[#1c2124] rounded-bl-none rounded-t-2xl rounded-br-2xl'}text-white`}>
                    <div>{msg.message}</div>
                    <div className='text-[13px] text-white'>{formatTime(msg.timestamp)}

                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
            <div className='w-full flex gap-[20px] items-center h-[100px] fixed bottom-0 px-[20px] justify-center'>
              <input
                type='text'
                placeholder='Type a message...'
                className='rounded-2xl bg-gray-700 outline-none text-white px-[20px] py-[10px] placeholder-white w-full'
                onChange={(e) => setMessageText(e.target.value)}
                value={messageText}
              />
              <button
                className='p-[10px] bg-white text-black rounded-2xl w-[100px] font-semibold'
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
