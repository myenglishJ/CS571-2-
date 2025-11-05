import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    setChatrooms(["Hello", "World"]) // for example purposes only!
  }, []);

  function handleLogin(username, pin) {
    // hmm... maybe this is helpful!
    fetch(`https://cs571.org/rest/s25/hw9/login`,{
      method : "POST",
      credentials: 'include',
      headers : {
        'X-ID-CS571':CS571.getBadgerId(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(res=>{
      if(res.status !== 200){
        return response.json().then(data => {
          throw new Error(data.message || 'Incorrect login, please try again.');
        });
      }
    })
    .then(data=>{
      SecureStore.setItemAsync('jwt', data.token).catch(error => {
        console.error('Error storing the JWT:', error);
      });
      setIsLoggedIn(true); // I should really do a fetch to login first!
    })
    .catch(error => {
      // Display an alert with the error message
      Alert.alert('Login Error', error.message);
    });
  }

  function handleSignup(username, pin) {
    // hmm... maybe this is helpful!
    setIsLoggedIn(true); // I should really do a fetch to register first!
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
  }
}