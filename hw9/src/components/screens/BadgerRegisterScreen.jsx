import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

function BadgerRegisterScreen(props) {
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin,setConfirmPin] = useState("");
    const regex = /^\d{7}$/;

    const checkRegister = () => {
        if(pin == ""){
            Alert.alert("Please enter a pin");
            return;
        }
        if(pin != confirmPin){
            Alert.alert("pins do not match");
            return;
        }
        if(!regex.test(pin)){
            Alert.alert(`a pin must be 7 digits${pin}${name}`);
            return;
        }
        props.handleSignup(name,pin);
    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text>Username</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            value={name}
            onChangeText={setName}
        />
        <Text>Password</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            maxLength= {7}
            secureTextEntry={true}
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
        />
        <Text>Confirm Password</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            maxLength= {7}
            secureTextEntry={true}
            value={confirmPin}
            onChangeText={setConfirmPin}
            keyboardType="numeric"
        />
        <Button color="crimson" title="Signup" onPress={() => checkRegister()} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default BadgerRegisterScreen;