import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { widthPercentageToDP,heightPercentageToDP} from "../responsive/calculate";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            success: false
        }
    }

    handleChange = (key,val) =>  {
        this.setState({error: ''});
        this.setState({[key]: val})
    }

    signup = (user) => {
        return fetch(`http://192.168.0.8:8080/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        }).catch(err => console.log("SIGNUP_ERR: ",err));
    }

    handleSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        }

        this.signup(user).then(res_data => {

            if (res_data.error) this.setState({error: res_data.error});
            else this.setState({
                name: '',
                email: '',
                password: '',
                error: '',
                success: true
            });
        });
    };

    render(){
        const {error,success,name,email,password} = this.state;
        return(
            success ?
                <View style={{flex:1,padding:10,backgroundColor:'whitesmoke'}}>
                    <TouchableOpacity style={{paddingTop:100,paddingHorizontal: 10}} onPress={()=>this.props.navigation.navigate('Login')}>
                        <Text style={{fontSize: 24}}>Welcome to the app, click me to log in.</Text>
                    </TouchableOpacity>
                </View> :
            <ScrollView contentContainerStyle={{flex: 1,paddingHorizontal:widthPercentageToDP('5%'),
                paddingVertical:heightPercentageToDP('5%'),backgroundColor:'whitesmoke'}} keyboardShouldPersistTaps='handled'>
                <StatusBar hidden/>
                <View style={{width:error ? 300:0,height:error ? 50:0,backgroundColor:'whitesmoke',marginTop:heightPercentageToDP('5%')}}>
                    <Text style={{color:'red',fontSize: 18}}>{error}</Text>
                </View>

                <Text style={styles.title}>Signup</Text>

                <View style={styles.form}>
                    <TextInput style={styles.input_name} onChangeText={val =>this.handleChange('name',val)} value={name} placeholder='Name'/>
                    <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}}/>
                    <TextInput style={styles.input_mail} value={email} onChangeText={val => this.handleChange('email',val)} placeholder='Email'/>
                    <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}}/>
                    <TextInput style={styles.input_pass} value={password} secureTextEntry={true} onChangeText={val =>this.handleChange('password',val)} placeholder='Pass'/>
                </View>

                <View>
                    <Button style={styles.button} title="signup" onPress={this.handleSubmit}/>
                </View>

                <View style={styles.bottom}>
                    <Button style={styles.button2} title="Back to login" onPress={()=>this.props.navigation.navigate('Login')}/>
                </View>
            </ScrollView>


        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize:50,
        fontWeight: '600'
    },
    form: {
        paddingTop:heightPercentageToDP('10%'),
        flex:0.8,
        paddingBottom:heightPercentageToDP('4%')
    },
    input_name: {
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        flex:0.33,
        backgroundColor: 'white'
    },
    input_mail: {
        flex:0.33,
        backgroundColor: 'white'
    },
    input_pass: {
        flex:0.33,
        backgroundColor:'white',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,

    },
    button: {
        paddingHorizontal:widthPercentageToDP('10%')
    },
    bottom:{
        paddingTop:heightPercentageToDP('7%'),
    },
    button2: {
        paddingHorizontal:100
    }
});

export default Signup;

