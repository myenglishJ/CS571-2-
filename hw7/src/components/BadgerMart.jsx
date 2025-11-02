import { Alert, Button, StyleSheet, Text, View } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'
import { useEffect, useState } from "react";

let totalQuantity = 0;
let totalPrice = 0;
export default function BadgerMart(props) {
    const [items,setItems] = useState({});
    const [currentKey,setCurrentKey] = useState("");
    const [isLoad,setIsLoad] = useState(false);
    const [cart,setCart] = useState({});
    

    useEffect(()=>{
        fetch("https://cs571.org/rest/s25/hw7/items",{
            headers:{
                'X-CS571-ID': CS571.getBadgerId(),
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setItems(data);
            setCurrentKey(Object.keys(data)[0]);
            setIsLoad(true);
        })
    },[])

    const previous = () => {
        const currentIndex = Object.keys(items).indexOf(currentKey);
        if(currentIndex > 0){
            setCurrentKey(Object.keys(items)[currentIndex-1]);
        }
    }
    
    const next = () => {
        const currentIndex = Object.keys(items).indexOf(currentKey);
        if(currentIndex < Object.keys(items).length-1){
            setCurrentKey(Object.keys(items)[currentIndex + 1]);
        }
    }

    const removeFromCart = (currentKey) => {
        const removeQuantity = cart[currentKey] - 1;
        setCart({...cart,[currentKey]:removeQuantity});
        totalQuantity--;
        totalPrice -= items[currentKey].price; 
    }
    const addToCart = (currentKey) => {
        const addQuantity = (cart[currentKey] || 0) + 1;
        setCart({...cart,[currentKey]:addQuantity});
        totalQuantity++;
        totalPrice += items[currentKey].price;
    }

    const submitCart = () => {
        Alert.alert(`Order Confirmed! Your order contains ${totalQuantity} items and costs $${totalPrice}!`);
        totalPrice = 0;
        totalQuantity = 0;
        setCart({});
        setCurrentKey(Object.keys(items)[0]);
    }

    //判断是否能前进/后退
    const currentIndex = Object.keys(items).indexOf(currentKey);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < Object.keys(items).length-1;

    const currentItem = items[currentKey];
    
    
    if(!isLoad){
        return <Text>Loading...</Text>;
    }
    //判断篮子里是否能加减
    currentQuantity = cart[currentKey] || 0;
    const hasRemove = currentQuantity > 0 ;
    const hasAdd = currentQuantity < items[currentKey].upperLimit;
    
    return <View>
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
        <View style={styles.button}>
            <Button onPress={previous} title="PREVIOUS" disabled={!hasPrevious}/>
            <Button onPress={next} title="NEXT" disabled={!hasNext}/>
        </View>
        <BadgerSaleItem {...currentItem}/>
        <View style={styles.button}>
            <Button title="-" onPress={()=>removeFromCart(currentKey)} disabled={!hasRemove}/>
            <Text>{currentQuantity}</Text>
            <Button title="+" onPress={()=>addToCart(currentKey)} disabled={!hasAdd}/>
        </View>
        <Text style={{ alignSelf: 'center' }}>You have {totalQuantity} item(s) costing ${totalPrice.toFixed(2)} in your cart</Text>
        <Button title="PLACE ORDER" disabled={totalQuantity==0} onPress={submitCart}/>
    </View>
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
});