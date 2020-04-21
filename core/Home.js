import React from 'react';
import {
    StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button,
    AsyncStorage, StatusBar, Image, FlatList, TouchableOpacity,ImageBackground
} from 'react-native';
import { widthPercentageToDP,heightPercentageToDP} from "../responsive/calculate";
import {AuthContext} from "../App";

export function Home() {

    const {signOut} = React.useContext(AuthContext);

    return (
        <View contentContainerStyle={styles.container}>
            <View style={styles.button}>
            <Button title='Signout' onPress={signOut} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        paddingTop:heightPercentageToDP('40%')
    }
})

export default Home;