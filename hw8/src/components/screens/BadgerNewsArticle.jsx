import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, Linking, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import CS571 from '@cs571/mobile-client';

export default function BadgerNewsArticle(props){
    const [article,setArticle] = useState("");
    const opval = useRef(new Animated.Value(0));
    const [isLoad,setIsload] = useState(true);
    const { title, imageUri, articleId } = props.route.params;

    useEffect(()=>{
        fetch(`https://cs571.org/rest/s25/hw8/article?id=${articleId}`,{
            headers : {
                'X-CS571-ID': CS571.getBadgerId(),
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticle(data);
            setIsload(false);
        })
        Animated.timing(opval.current,{
            toValue : 1,
            duration : 1000,
            useNativeDriver : false
        }).start()
    },[article,opval.current])

    if(isLoad){
        return <ScrollView style={styles.container}>
            <Image 
                style={styles.images}
                source={{uri : imageUri}}
                />
            <Text style={styles.title}>{title}</Text>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.loadingText}>The content is loading!</Text>
        </ScrollView>
    }

    const handlePress = () => {
        Linking.openURL(article?.url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ScrollView style={styles.container}>
            <Image 
                style={styles.images}
                source={{uri : imageUri}}
                />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.headerText}>{`By ${article.author} on ${article.posted}`}</Text>
            <Pressable onPress={handlePress}>
                <Text style={styles.linkText}>Read full article here.</Text>
            </Pressable>
            {
                article?.body?.map((paragraph, index) => (
                    <Text key={index} style={styles.paragraph}>{paragraph}</Text>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 20,
        color: "#3498db",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 20,
    },
    images: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 20,
    },
    linkText: {
        color: '#3498db',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
})