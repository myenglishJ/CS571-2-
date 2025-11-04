import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen.jsx";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen.jsx";
const BadgerSocialTab = createBottomTabNavigator();

function BadgerTabs(props) {
    return (
        <BadgerSocialTab.Navigator >
            <BadgerSocialTab.Screen name="News" component={BadgerNewsScreen}/>
            <BadgerSocialTab.Screen name="Preferences" component={BadgerPreferencesScreen}/>
        </BadgerSocialTab.Navigator>
    )
}

export default BadgerTabs;