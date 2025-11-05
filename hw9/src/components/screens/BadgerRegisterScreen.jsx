import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./BadgerLoginScreen";
import { useState } from "react";

function BadgerRegisterScreen(props) {
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin,setConfirmPin] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text>Username</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            value={name}
            onChange={setName}
        />
        <Text>Password</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            maxLength= {7}
            secureTextEntry={true}
            value={pin}
            onChange={setPin}
            keyboardType="numeric"
        />
        <Text>Confirm Password</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            maxLength= {7}
            secureTextEntry={true}
            value={confirmPin}
            onChange={setConfirmPin}
            keyboardType="numeric"
        />
        <Button color="crimson" title="Signup" onPress={() => Alert.alert("Hmmm...", "This should do something!")} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerRegisterScreen;