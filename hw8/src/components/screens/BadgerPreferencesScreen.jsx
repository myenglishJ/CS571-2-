import { StyleSheet, Switch } from "react-native";
import { Text, View } from "react-native";
import { BadgerContext } from "../../Context/BadgerContext";
import { useContext, useEffect } from "react";

function BadgerPreferencesScreen(props) {
    const {prefs, tag, setPrefs } = useContext(BadgerContext);
    
    function toggleSwitch (tag) {
        setPrefs(prePrefs => ({
            ...prePrefs,
            [tag] : !prePrefs[tag]
        }));
    }
    return <View>
        {
            tag.map((tag,index)=>{
                return <View  key={index} style={styles.card}>
                        <Text style={styles.tagText}>{tag}</Text>
                        <Switch 
                            value={prefs[tag]} 
                            onValueChange={()=>toggleSwitch(tag)}
                            />
                    </View>
            })
        }
    </View>
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    tagText: {
        fontSize: 16,
        color: '#212121'
    }
});

export default BadgerPreferencesScreen;