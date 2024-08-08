import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuthStore from "../store/authStore";

const Stack = createNativeStackNavigator();

export default function AppNavigation(): JSX.Element {
    const {userData} = useAuthStore(state => state)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { !userData ? (
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/> ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
    )
    }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
