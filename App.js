import React from 'react';
import {AsyncStorage} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './AuthScreens/signup';
import Home from './core/Home';
import {heightPercentageToDP, widthPercentageToDP} from "./responsive/calculate";
import {Login} from "./AuthScreens/Login";


export const AuthContext = React.createContext();
const Stack= createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

export default function App({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: action.token,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to the appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('jwt');
            } catch (e) {
                console.log("__RESTORE_TOKEN_ERROR__ :",e);
            }

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                let jwt =null;
                const getToken = fetch(`http://192.168.0.8:8080/signin`,{
                    method:"POST",
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json"
                    },
                    body:data
                }).then(res =>{
                    return (res.json());
                }).catch(err => {console.log("__SIGN_IN_ERROR__: ",err)});

                await getToken.then(res_data => {
                    if(res_data.error){
                        jwt = null;
                    }else{
                        jwt = res_data;
                    }
                });

                await AsyncStorage.setItem("jwt", JSON.stringify(jwt));

                dispatch({ type: 'SIGN_IN', token: jwt });
            },

            signOut: async () => {
                await AsyncStorage.clear();
                const signout = fetch(`http://192.168.0.8:8080/signout`,{
                    method:"GET"
                }).then(res =>{
                    return res.json()
                }).catch(err =>console.log(err));

                await signout.then(res_data =>console.log(res_data));

                dispatch({ type: 'SIGN_OUT' ,token:null});
            },

        }),
        []
    );
    const homeStackScreens = () => {
        return (
            <HomeStack.Navigator screenOptions={{headerShown: false}}>
                <HomeStack.Screen name='Home' component={Home}/>
            </HomeStack.Navigator>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.userToken == null ? (

                        <Stack.Navigator screenOptions={{headerShown: false}}>
                            <Stack.Screen name='Login' component={Login}/>
                            <Stack.Screen name="Signup" component={Signup}/>
                        </Stack.Navigator>
                ) : (
                        <Tab.Navigator
                            initialRouteName='Home'
                            screenOptions={{headerShown: false}}
                            tabBarOptions={{
                                style: {height: heightPercentageToDP('6.5%')}
                            }}>
                            <Tab.Screen name="Home" component={homeStackScreens}/>
                        </Tab.Navigator>

                )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}



