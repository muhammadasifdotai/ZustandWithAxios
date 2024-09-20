import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signIn } from "../store/authApiServices";
import useAuthStore from "../store/authStore";

export default function LoginScreen(): JSX.Element {

    // state
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const {updatedUserData} = useAuthStore()
    const handleUserData = () => {
        try {
           
        } catch (error) {

        }
    }

    // Function
    const handleLogin = () => {
        try {
            const params = {
                username : 'emilys',
                password: 'emilyspass',
            }
            console.log('params: LoginScreen', params)
            await updatedUserData(params)
            signIn(params)
        } catch (error) {
            console.log('Error During Login In LoginScreen')
        }
    }

    return (
        <View style={styles.main}>
            <TextInput
            value={userName} 
            onChangeText={setUserName}
            placeholder="Enter User Name"
            placeholderTextColor='white'
            style={styles.input}
            />
            <TextInput
            value={password} 
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor='white'
            style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'grey',
        width: '100%',
        height: 50,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'grey',
        width: '100%',
        paddingLeft: 15,
        marginBottom: 15,
    },
    main: {
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 20,
    }
})
