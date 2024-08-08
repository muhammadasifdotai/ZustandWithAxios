import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuthStore from "../store/authStore";
import ProductListTest from "../screens/ProductListTest";
import LoginScreen from "../screens/LoginScreen";
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function AppNavigation(): JSX.Element {
    const {userData} = useAuthStore(state => state)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { !userData ? (
        <Stack.Group>
        <Stack.Screen name="ProductListTest" component={ProductListTest} options={{headerShown: false}}/> 
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown: false}}/>
        </Stack.Group> 
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
    )
    }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
