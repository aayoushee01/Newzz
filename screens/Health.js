import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, RefreshControl, TouchableWithoutFeedback, Animated, ImageBackground} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import backgrondImg from '../assets/bHealth.jpg'
import { NativeBaseProvider, FlatList, ScrollView, Image, Spinner } from 'native-base';
import { services } from '../services/services';
import moment from 'moment'
import * as WebBrowser from 'expo-web-browser';
import * as Sharing from 'expo-sharing'; 
import * as FileSystem from 'expo-file-system';

const openShareDialogAsync = async (mediaProps, index) => {
    const mediaProp = mediaProps.urlToImage;
    const messageText = mediaProps.title + mediaProps.url;
    const fileDetails = {
      extension:'.jpg',
      shareOptions: {
        mimeType: 'image/jpeg',
        dialogTitle:messageText,
        UTI: 'image/jpeg',
      },
    };
    const downloadPath = `${FileSystem.cacheDirectory}image-Health${index}${fileDetails.extension}`;
    const { uri: localUrl } = await FileSystem.downloadAsync(
      mediaProp,
      downloadPath
    );
    if (!(await Sharing.isAvailableAsync())) {
      showMessage({
        message: 'Sharing is not available',
        description: 'Your device does not allow sharing',
        type: 'danger',
      });
      return;
    }
    await Sharing.shareAsync(localUrl, fileDetails.shareOptions);
  };
class NewsItem extends React.Component {
    constructor() {
        super()
        this.onToggle = this.onToggle.bind(this)
        this.onPressed = this.onPressed.bind(this)
        this.state = {
            isopen: false,
            ispressed: false,
        }
    }
    onToggle(e) {
        // alert("Pressed the item at index");
        this.setState(({ isopen }) => ({
            isopen: !isopen
        }));
    }
    onPressed(e) {
        this.setState(({ ispressed }) => ({
            ispressed: !ispressed
        }));
    }
    render() {
        var isOpen = this.state.isopen;
        var isPressed = this.state.ispressed;
        var item = this.props.item;
        var index = this.props.index;
        let icon = null;
        let ifle = 1;
        let ihig = 230;
        switch (isPressed) {
            case false:
                ifle = 1
                ihig = 230
                break;
                case true:
                    ifle = 0.4
                    ihig = 115
                break;
        }
        switch (isOpen) {
            case false:
                icon = <Icon name="chevron-down" size={24} color="black" type="entypo" onPress={this.onToggle} />
                break;

            case true:
                icon = <Icon name="chevron-up" size={24} color="black" type="entypo" onPress={this.onToggle} />
                break;
        }
        const ITEM_SIZE = 400;
        const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 10)
        ]
        const scrlY = this.props.fRef;
        const scale = scrlY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
        })
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.onPressed} >
                    <Animated.View 
                    style={{
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        elevation: 24,
                        justifyContent:'space-between',
                        transform: [{ scale }]
                    }}>
                        <View 
                            style={{
                                padding: isPressed ? 10 : 0,
                                backgroundColor: "#FFFFFF",
                                shadowColor: isPressed ? "#000" : "#FFF",
                                shadowOffset: {
                                    width: 0,
                                    height: isPressed ? 12 : 0,
                                },
                                shadowOpacity: isPressed ? 0.58 : 0.0,
                                shadowRadius: isPressed ? 16.00 : 0.0,
                                borderRadius: isPressed ? 15 : 0,
                                elevation: isPressed ? 24 : 0,
                                flexDirection: isPressed ? 'row' : 'column',
                            }}>
                            <Image
                                borderRadius={20}
                                height={ihig}
                                resizeMode={"cover"}
                                source={{
                                    uri: item.urlToImage,
                                }}
                                alt="Alternate Text"
                                flex={ifle}
                            />
                            <View style={{
                                flex:isPressed? 1:0.6,
                                paddingLeft: isPressed ? 10 : 0,
                                flexDirection:'column',
                                justifyContent:'space-between'
                            }}>
                                <View
                                style={{
                                    flex: ifle,
                                    flexDirection:'column'
                                }}
                                >
                                <Text style={{
                                    fontSize: 16,
                                    marginTop: isPressed ?0:4,
                                    marginBottom: 3,
                                    fontWeight: "600"
                                }}>
                                    {item.title}
                                </Text>
                                </View>
                                <View style={styles.con}>
                                    <View>
                                        <Text style={styles.date}>
                                            {moment(item.publishedAt).format('LLL')}
                                        </Text>
                                    </View>
                                    <View>
                                    <Icon name="share" size={24} color="black" type="entypo" onPress={() =>
      openShareDialogAsync(item, index)
       } />
                                    </View>
                                    {!isPressed ? (<View style={styles.iconS}>
                                        {icon}
                                    </View>) : (<View />)}
                                </View>
                            </View>
                            {isOpen ? (
                                <View>
                                    <Text style={styles.newsDescription}>{item.description}</Text>
                                </View>
                            ) : (
                                <View>
                                </View>
                            )}
                        </View>
                        {isPressed?(<View
                         style={{
                            padding: 10 ,
                            marginTop:15,
                            backgroundColor: "#FFFFFF",
                            shadowColor: "#000" ,
                            shadowOffset: {
                                width: 0,
                                height: 12 ,
                            },
                            shadowOpacity: 0.58 ,
                            shadowRadius: 16.00 ,
                            borderRadius: 15 ,
                            elevation: 24 ,
                        }}>
                            <Text>{item.content}</Text>
                            <Text style={{color: 'blue'}}
                                 onPress={() => WebBrowser.openBrowserAsync(item.url)}>
                                Link to original article
                            </Text>
                        </View>):(<View/>)}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const Health = () => {
    const [newsData, setNewsData] = useState([])
    useEffect(() => {
        services('health')
            .then(data => {
                setNewsData(data)
            })
            .catch(error => {
                alert(error)
            })
    }, [])
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        services('health')
            .then(data => {
                setNewsData([])
                setNewsData(data)
            })
            .catch(error => {
                alert(error)
            })
        setRefreshing(false)
    };
    const scrollY = React.useRef(new Animated.Value(0)).current;
    return (
        <NativeBaseProvider>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <ImageBackground
                    source={backgrondImg}
                    style={styles.bgImage}>
                    {newsData.length > 1 ? (
                        <Animated.FlatList
                            data={newsData}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )}
                            keyExtractor={item => item.publishedAt}
                            contentContainerStyle={{
                                padding: 15,
                            }}
                            renderItem={({ item, index }) => <NewsItem fRef={scrollY} item={item} index={index} />}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />) : (
                        <View style={styles.spinner}>
                            <Spinner color="danger.400" />
                        </View>
                    )}
                </ImageBackground>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    iconS: {
        // alignSelf:'flex-end'
    },
    con: {      
        display: 'flex',
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newsContainer: {

    },
    title: {
        fontSize: 16,
        marginTop: 4,
        fontWeight: "600"
    },
    newsDescription: {
        fontSize: 16,
        marginTop: 10
    },
    date: {
        fontSize: 12
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500
    }, bgImage: {
        width: '100%',
        height: 'auto',
        resizeMode: 'cover',
        flex: 1
    },
});

export default Health;