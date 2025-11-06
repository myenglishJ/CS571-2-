import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';
import { Alert } from 'react-native';


const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isGuest,setIsGuest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [user,setUser] = useState("");
  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw9/chatrooms", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      },
    })
    .then(res => res.json())
    .then(json => {
      setChatrooms(json)
    })
  }, []);

  const onLogout = () => {
    setIsLoggedIn(false);
  }

  function handleLogin(username, pin) {
    fetch(`https://cs571.org/rest/s25/hw9/login`,{
      method : "POST",
      credentials: 'include',
      headers : {
        'X-CS571-ID':CS571.getBadgerId(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          pin: pin
      })
    })
    .then(res=>{
      if(res.status != 200){
        return res.json().then(data => {
          throw new Error(res.status || 'Incorrect login, please try again.');
        });
      }
      return res.json()
    })
    .then(data=>{
      SecureStore.setItemAsync('jwt', data.token).catch(error => {
        console.error('Error storing the JWT:', error);
      });
      setIsLoggedIn(true);
      setUser(username);
    })
    .catch(error => {
      Alert.alert('Login Error', error.message);
    });
  }

  function handleSignup(username, pin) {
    fetch(`https://cs571.org/rest/s25/hw9/register`,{
      method : 'POST',
      credentials: 'include',
      headers : {
        'X-CS571-ID':CS571.getBadgerId(),
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        "username": username,
        "pin": pin
      })
    })
    .then(res => {
      if(res.status == 409){
        Alert.alert("The username is already token");
      }
      if(res.status == 200){
        Alert.alert("Successfully register");
      }
      else {
        Alert.alert(`false${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      SecureStore.setItemAsync('jwt', data.token);
      setIsLoggedIn(true);
      setUser(username);
    })
  }

  if (isGuest||isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} username={user} isGuest={isGuest}/>}
              </ChatDrawer.Screen>
            })
          }
          {
            isGuest ?
            <ChatDrawer.Screen name="SIGNUP!">
              {(props) =><BadgerConversionScreen setIsRegistering={setIsRegistering} setIsGuest={setIsGuest}/>} 
            </ChatDrawer.Screen> 
            :<ChatDrawer.Screen name="Logout">
              {(props) =><BadgerLogoutScreen onLogout={onLogout}/>} 
            </ChatDrawer.Screen> 
          }
          
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest}/>
  }
}