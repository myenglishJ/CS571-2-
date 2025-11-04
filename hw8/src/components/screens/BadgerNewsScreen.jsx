import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import {BadgerContext} from '../../Context/BadgerContext';
import BadgerNewsItemCard from '../BadgerNewsItemCard';
import { useContext, useEffect, useState } from "react";

function BadgerNewsScreen(props) {
    const { prefs, data } = useContext(BadgerContext);
    const [ filarticle, setFilarticle] = useState([]);
    
    useEffect(()=>{
        const filtered = data.filter((article)=>{
            return article.tags.every(tag => prefs[tag] !== false)
        });
        setFilarticle(filtered);
    },[prefs,data])

    return <ScrollView>
        {
            filarticle.map(article => {
                return <BadgerNewsItemCard {...article} key={article.id}/>
            })
        }
    </ScrollView>
}

export default BadgerNewsScreen;