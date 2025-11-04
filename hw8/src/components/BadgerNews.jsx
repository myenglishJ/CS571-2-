import { NavigationContainer } from '@react-navigation/native';
import { useState,useEffect } from 'react';
import BadgerTabs from './navigation/BadgerTabs';
import CS571 from '@cs571/mobile-client';
import { BadgerContext } from '../Context/BadgerContext';
import { Alert } from 'react-native';

export default function BadgerNews(props) {
  
  // Just a suggestion for Step 4! Maybe provide this to child components via context...
  const [prefs, setPrefs] = useState({});
  const [tag,setTag] = useState([]);
  const [data,setData] = useState([]);

  useEffect(()=>{
    fetch("https://cs571.org/rest/s25/hw8/articles",{
        headers : {
          'X-CS571-ID': CS571.getBadgerId(),
        }
    })
    .then(res=>res.json())
    .then(res=>{
      const uniqueTags = new Set();

      res.forEach(article => {
          article.tags.forEach(tag => uniqueTags.add(tag));
      });
      //制造一个对象，键为每个tag，值为true
      const initialPrf = Array.from(uniqueTags).reduce((acc,tag)=>{
        acc[tag] = true;
        return acc;
      },{});

      setPrefs(initialPrf);
      setTag(Array.from(uniqueTags));
      setData(res);
    })
  },[])

  return (
      <BadgerContext.Provider value={{prefs,setPrefs,data,setData,tag,setTag}}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerContext.Provider>
  );
}