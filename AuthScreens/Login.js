import React from "react";
import {Button, ScrollView, StatusBar, Text, TextInput, View,StyleSheet} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "../responsive/calculate";
import {AuthContext} from "../App";

export function Login({navigation}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {signIn} = React.useContext(AuthContext);
    const user = JSON.stringify({email,password});
    return (

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <StatusBar hidden/>

            <Text style={styles.name}>the app</Text>

            <View style={styles.form}>

                <TextInput style={styles.input_mail} value={email} onChangeText={setEmail} placeholder='Email'/>
                <View style={{borderBottomColor: 'gray', borderBottomWidth: 1,}}/>
                <TextInput style={styles.input_pass} secureTextEntry={true} value={password} onChangeText={setPassword}
                           placeholder='Pass'/>
            </View>

            <View style={styles.button}>
                <Button onPress={()=>signIn(user)} title='login'/>
            </View>

            <View style={styles.bottom}>
                <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 30}}>Dont have an account ? </Text>
                <Button style={styles.button2} title='signup' onPress={() => navigation.navigate('Signup')}/>
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: widthPercentageToDP('5%'),
        paddingVertical: heightPercentageToDP('5%'),
        backgroundColor: 'whitesmoke'
    },
    name: {

        fontSize:50,
        fontWeight: '600'
    },
    form: {
        paddingTop:heightPercentageToDP('10%'),
        flex:1
    },
    input_mail: {
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        flex:0.5,
        backgroundColor: 'white'
    },
    input_pass: {
        flex:0.5,
        backgroundColor:'white',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
    },
    button: {
        paddingTop:heightPercentageToDP('4%'),
        paddingHorizontal:100
    },
    bottom:{
        paddingTop:heightPercentageToDP('18%'),
        paddingBottom:heightPercentageToDP('7%')
    },
    button2: {
        paddingHorizontal: 100
    }
})