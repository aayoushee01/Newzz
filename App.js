import React, {useState, useEffect,useLayoutEffect} from 'react';
import {SafeAreaView ,Platform, StatusBar} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import All from './screens/All';
import Business from './screens/Business';
import Health from './screens/Health';
import Sports from './screens/Sports';
import Tech from './screens/Tech';
import { Icon } from 'react-native-elements'
const Tab = createMaterialTopTabNavigator();
import {API_KEY_WE} from './config/config';
import * as Location from 'expo-location';

export default function App() {
  // const [data, setData] = useState({});
  // const [weather, setWeather] = useState({});
  // const [main, setMain] = useState({});
  // const [sys, setSys] = useState({});
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       fetchDataFromApi("40.7128", "-74.0060")
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     fetchDataFromApi(location.coords.latitude, location.coords.longitude);
  //   })();
  // }, [])

  // const fetchDataFromApi = (latitude, longitude) => {
  //   if(latitude && longitude) {
  //     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY_WE}`)
  //     .then(res => res.json()).then(data => {
  //     setMain(data.main)
  //     setWeather(data.weather[0])
  //     setData(data)
  //     })
  //   }
  // }
  return (
    <SafeAreaView style={{flex : 1, backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
      <NavigationContainer>
      <Tab.Navigator tabBarPosition='bottom'
        tabBarOptions={{
          labelStyle: { fontSize: 7 },
          style:{
            position:'absolute',
            right:8,
            left:8,
            bottom:20,
            borderRadius:15,
            heigth:90
          }
        }}
        >
        <Tab.Screen name="All" 
        // children={() => <All dt={data}/>}
        options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='home' color={props.color} />
              ),
            }} >
             {() => <All />}
            </Tab.Screen>

        <Tab.Screen name="Business" 
          options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='dollar-sign' color={props.color} />
              ),
            }} >
              {() => <Business />}
            </Tab.Screen>


        <Tab.Screen name="Health" 
          options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='heart' color={props.color} />
              ),
            }} >
              {() => <Health/>}
            </Tab.Screen>

        <Tab.Screen name="Sports" 
          options={{
            tabBarIcon: (props) => (
              <Icon type='ionicon' name="tennisball-outline" color={props.color} />
              ),
            }} >
            {() => <Sports/>}
          </Tab.Screen>

        <Tab.Screen name="Tech" 
          options={{
            tabBarIcon: (props) => (
              <Icon type='ionicon' name="hardware-chip-outline" color={props.color} />
              ),
            }} >
            {() => <Tech/>}
          </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}