import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useAuthStore from "../../store/authStore";

export default function HomeScreen(): JSX.Element {
    const {logout} = useAuthStore(state => state)
    return (
        <View>
            <Text>Alhamdulillah</Text>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}