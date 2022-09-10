import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import sun1 from '../assets/sun1.png'
import sun2 from '../assets/sun2.png'
import sun3 from '../assets/sun3.png'
import sun4 from '../assets/sun4.png'
import moon1 from '../assets/moon1.png'
import moon2 from '../assets/moon2.png'
import moon3 from '../assets/moon3.png'
import moon4 from '../assets/moon4.png'
import nImage from '../assets/sun1.png'
import { API_KEY_WE } from '../config/config';
import * as Location from 'expo-location';
const WeatherCard = () => {

    const [sunrise, setSunriseTime] = useState('')
    const [sunset, setSunsetTime] = useState('')
    const [data, setData] = useState({});
    const [weather, setWeather] = useState({});
    const [main, setMain] = useState({});
    const [sys, setSys] = useState({});
    const [weatherCardImage, setImg] = useState(nImage);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                fetchDataFromApi("40.7128", "-74.0060")
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            fetchDataFromApi(location.coords.latitude, location.coords.longitude);
        })();
    }, [])

    const fetchDataFromApi = (latitude, longitude) => {
        if (latitude && longitude) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY_WE}`)
                .then(res => res.json()).then(data => {
                    setMain(data.main)
                    setWeather(data.weather[0])
                    setSys(data.sys)
                    setData(data)
                })
        }
    }
    useEffect(() => {
        var timeii = new Date().getHours();
        var timei = Number(timeii);
        var sdate = new Date(sys.sunrise * 1000)
        var sunrise = sdate.getHours() + ':' + sdate.getMinutes() + ' AM'
        var ssdate = new Date(sys.sunset * 1000)
        var sunset = ssdate.getHours() + ':' + ssdate.getMinutes() + ' PM'
        setSunriseTime(sunrise);
        setSunsetTime(sunset);
        setSunMoonImage(timei);
    })
    const setSunMoonImage = (timei) => {
        if (timei >= 5 && timei < 8) { setImg(sun1) }
        else if (timei >= 8 && timei < 11) { setImg(sun2) }
        else if (timei >= 15 && timei < 17) { setImg(sun3) }
        else if (timei >= 11 && timei < 15) { setImg(sun4) }
        else if (timei >= 17 && timei < 20) { setImg(moon1) }
        else if (timei >= 20 && timei < 23) { setImg(moon2) }
        else if (timei >= 1 && timei < 5) { setImg(moon3) }
        else if (timei >= 23 || timei < 1) { setImg(moon4) }
    }
    return (
        //             <Text style={styles.notes}>{Math.round(temp * 10) / 10}&#8451;</Text>
            <View>
                <View style={styles.weaContainer}>

            <View style={{
                borderRadius: 20,
                flex: 0.25,
                marginRight: 2,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                padding:3,
                justifyContent:'space-around',
                alignItems:'center'
            }}>
                <Text style ={styles.text1}>{data.name}</Text>
                <Text style ={styles.text2}>{Math.round(main.temp * 10) / 10}&#8451;</Text>
                <Text style ={styles.text3}>{weather.description}</Text>
            </View>
            <View style={{
                borderRadius: 20,
                flex: 0.75,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                height:150,
            }}>
                <Image
                    resizeMode={"contain"}
                    borderRadius={20}
                    // height={200}
                    style={styles.bgImage}
                    source={weatherCardImage}
                    alt="Alternate Text"
                    flex={1}/>
               
            </View>
</View>
<View style={{
    //   marginBottom: 4,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: "#FFFFFF",
        borderRadius: 15,
        elevation: 24,
        flexDirection:'row',
        justifyContent:'space-between'
}}>
<Text>Sunrise : {sunrise} </Text>
<Text>Sunset : {sunset} </Text>
</View>
        </View>
    )
}
const styles = StyleSheet.create({
    weaContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        borderWidth: 0,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        marginTop: 8,
        marginBottom: 4,
        marginLeft: 10,
        marginRight: 10,
    },
    text2: {
        fontSize: 20,
    },
    text1: {
        // fontSize: 20,
    },
    text3: {
        fontSize: 10,
        textTransform: 'capitalize'
    },
    bgImage: {
        height: undefined,
        width: undefined,
        borderRadius: 20,
        // resizeMode: 'stretch',
        flex: 1
    }
})
export default WeatherCard;