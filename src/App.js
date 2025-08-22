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
    
  );
}

export default App;
