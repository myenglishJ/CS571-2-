import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerNewsArticle from "../screens/BadgerNewsArticle";

const stack = createNativeStackNavigator();

export default function BadgerNewsStack(){
    return(
        <stack.Navigator>
            <stack.Screen 
                name="Articles" 
                component={BadgerNewsScreen}
            />
            <stack.Screen 
                name ="Article" 
                component={BadgerNewsArticle} 
                options={{headerShown: false}}
            />
        </stack.Navigator>
    );
}