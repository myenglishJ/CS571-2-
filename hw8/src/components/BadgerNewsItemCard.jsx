import { useNavigation } from "@react-navigation/native";
import { Alert, Image, Pressable, StyleSheet, Text } from "react-native";


export default function BadgerNewsItemCard(props){
    const navigation = useNavigation();

    return <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('Article',{
            "title" : props.title,
            "imageUri" : `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${props.img}`,
            "articleId" : props.fullArticleId
        })}
    >
        <Image 
            style={styles.image} 
            source={{ uri : `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${props.img}`}}
        />
        <Text style={styles.title}>{props.title}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
});