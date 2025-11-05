import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

function BadgerLoginScreen(props) {
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text>Username</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            value={name}
            onChange={setName}
        />
        <Text>PIN</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize = "none"
            maxLength= {7}
            secureTextEntry={true}
            value={pin}
            onChange={setPin}
            keyboardType="numeric"
        />
        <Button color="crimson" title="Login" onPress={() => {
            Alert.alert("Hmmm...", "I should check the user's credentials!");
            props.handleLogin(name, pin)
        }} />
        <Text>New here?</Text>
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
    </View>;
}

export const styles = StyleSheet.create({
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

export default BadgerLoginScreen;