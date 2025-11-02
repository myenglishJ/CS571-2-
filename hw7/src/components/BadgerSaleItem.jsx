import { Image, StyleSheet, Text, View } from "react-native";

export default function BadgerSaleItem(props) {

    return <View style={styles.container}>
        <Text>I am an item!</Text>
        <Image style={styles.image} source={{ uri : props.imgSrc }}/>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)} each</Text>
        <Text style={styles.text}>You can order up to {props.upperLimit} units!</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 10,
    },
    name: {
        fontSize: 30,
        marginBottom: 5,
    },
    price: {
        fontSize: 17,
        marginBottom: 5,
    },
    text: {
        fontSize: 17,
        textAlign: 'center',
    },
})