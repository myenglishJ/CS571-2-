import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import CS571 from '@cs571/mobile-client';
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {
    const [message,setMessage] = useState({});
    const [isLoad,setIsLoad] = useState(true);
    const [addPost,setAddPost] = useState(false);
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    async function getToken() {
        return await SecureStore.getItemAsync('jwt').catch(error => {
            console.error('Error storing the JWT:', error);
        });
    }

    useEffect(()=>{
        fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`,{
            method : "GET",
            headers : {
                'X-CS571-ID':CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
                setMessage(data.messages);
                setIsLoad(false);
        })
    },[props])

    const isLoading = () => {
        setIsLoad(true);
        fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`,{
            method : "GET",
            headers : {
                'X-CS571-ID':CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.messages);
            setIsLoad(false);
        })
    } 

    const createPost = ()=>{
        getToken().then(token=>{
                fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`,{
                method : "POST",
                headers : {
                    'X-CS571-ID':CS571.getBadgerId(),
                    "Authorization": `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    "title": title,
                    "content": body
                })
            })
            .then(res=>{
                if (!res.ok) {
                    throw new Error('Failed to create post');
                }
                return res.json();
            })
            .then(() => {
                Alert.alert("Success", "Your post was successfully created!");
                setTitle('');
                setBody('');
                isLoading();
                setAddPost(false)
            }).catch(error => {
                console.error('API request failed:', error);
            });
        });
        
    }

    const  handleDelectPost =  (id) => {
        getToken().then(token => {
            fetch(`https://cs571.org/rest/s25/hw9/messages?id=${id}`,{
                method : "DELETE",
                headers : {
                    "Authorization": `Bearer ${token}`,
                    'X-CS571-ID':CS571.getBadgerId()
                }
            })
            .then(res => {
                if(!res.ok){
                     throw new Error('Failed to delete post');
                }
                return res.json
            })
            .then(() => {
                Alert.alert("Success", "Successfully deleted the post!");
                isLoading();
            }).catch(error => {
                console.error('API request failed:', error);
            });
        })
        
    }
    return <View style={{ flex: 1 }}>
                <Modal 
                    animationType="slide"
                    visible = {addPost}
                    onRequestClose={()=>{
                        setAddPost(false);
                    }}
                >   
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Create A Post</Text>
                        <Text style={styles.inputLabel}>Title</Text>
                        <TextInput 
                            value={title}
                            style={styles.textInput}
                            onChangeText={setTitle}
                        />
                        <Text style={styles.inputLabel}>Body</Text>
                        <TextInput
                            value={body}
                            style={[styles.textInput, styles.bodyInput]}
                            multiline={true}
                            onChangeText={setBody}
                        />
                        <View style={styles.modalButtonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button color="#be71c0ff" title="CREATE POST" onPress={()=>createPost()} disabled={title == "" || body == ""}/>
                                <Button color="#6c757d" title="CANCEL" onPress={()=>setAddPost(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={message}
                    renderItem={({item}) => {
                        return <BadgerChatMessage {...item} username={props.username} onDelect = {handleDelectPost}/>
                    }}
                    keyExtractor={item => item.id}
                    onRefresh={isLoading}
                    refreshing={isLoad}
                />
                <View style={{
                        position: 'absolute',
                        bottom: 0, // 距离底部 20
                        width: '100%', // 占据父容器的宽度
                        alignSelf: 'center', // 居中
                        backgroundColor: '#dc1313fc'
                    }}>
                    {
                        !props.isGuest && <Button title="ADD POST" onPress={()=>setAddPost(true)}/>
                    }
                </View>
            </View>
            
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalContent: {
        padding: 20,
        marginTop: 50, // 顶部留出空间
        flex: 1,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    bodyInput: {
        height: 100, // 给 Body 较大的高度
        textAlignVertical: 'top', // 文本从顶部开始输入
    },
    // 按钮布局容器 (实现水平排列)
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // 将按钮推到右侧
        marginTop: 20,
    },
    // 单个按钮的包装器 (实现间距)
    buttonWrapper: {
        width: '40%', // 按钮占据 Modal 宽度的 40%
        marginLeft: 10, // 按钮之间留出 10px 间距
    }
});

export default BadgerChatroomScreen;