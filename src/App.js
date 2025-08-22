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

  const appID = Number(process.env.REACT_APP_APP_ID);
  const tokenA = process.env.REACT_APP_TOKEN_A;
const tokenB = process.env.REACT_APP_TOKEN_B;
const messageEndRef = useRef(null);
useEffect(() => {
  if (!appID) {
    console.error("AppID not found! Please check your .env file");
    return;
  }
    const token = selectedUser === "Kajal" ? tokenA : tokenB;

  const instance = ZIM.create({
    appID: Number(appID),    // Make sure it's a number
    userID: selectedUser,    // Optional at creation, can set at login
    userName: selectedUser,
    token: token
  });

  setZimInstance(instance);

  instance.on('error', (_instance, errorInfo) => {
    console.error(errorInfo)
  });

  instance.on('peerMessageReceived', (_instance, { messageList }) => {
    setMessages(prev => [...prev, ...messageList]);
  });

  instance.on('tokenWillExpire', (_instance, { second }) => {
    const renewToken = selectedUser === "Kajal" ? tokenA : tokenB;
    instance.renewToken(renewToken).catch(console.error);
  });

  return () => {
    instance.destroy();
  };
}, [appID, selectedUser,tokenA , tokenB]);

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
