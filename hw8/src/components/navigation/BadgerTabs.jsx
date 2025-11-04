import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen.jsx";
import BadgerNewsStack from "./BadgerNewsStack.jsx"
const BadgerSocialTab = createBottomTabNavigator();

function BadgerTabs(props) {
    return (
        <BadgerSocialTab.Navigator >
            <BadgerSocialTab.Screen name="News" component={BadgerNewsStack} options={{headerShown: false}}/>
            <BadgerSocialTab.Screen name="Preferences" component={BadgerPreferencesScreen}/>
        </BadgerSocialTab.Navigator>
    )
}

export default BadgerTabs;