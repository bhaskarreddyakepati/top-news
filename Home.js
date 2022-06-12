import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Pressable, 
        ActivityIndicator, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { AdMobBanner, AdMobRewarded, AdMobInterstitial } from 'expo-ads-admob';

export default function HomePage({navigation}){

    const [dataLoading, finishLoading] = useState(true);
    const [newsData, setData] = useState([]);

    const interstitial =  async() => {
        await AdMobInterstitial.setAdUnitID('ca-app-pub-2757266309368027/1701838526'); // Test ID, Replace with your-admob-unit-id
        try {
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
            await AdMobInterstitial.showAdAsync();
        }catch(error){
            console.log(error);
        }
    }

    const rewarded =  async() => {
        await AdMobRewarded.setAdUnitID('ca-app-pub-2757266309368027/4308918040'); // Test ID, Replace with your-admob-unit-id
        try {
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        }catch(error){
            console.log(error);
        }
    }
    const bannerError = () => {
        console.log("Error occurred while loading banner");
    }

    useEffect(() => {
        fetch("https://newsdata.io/api/1/news?apikey=pub_822385489c7a6540a6f77e4ff4ffe7e21dfd&q=india&language=en")
        .then((response) => response.json())
        .then((json) => setData(json.results))
        .catch((error) => console.error(error))
        .finally( () => finishLoading(false))
    }, [])

    const styoryItem = ({item}) => {
        return (
            <TouchableWithoutFeedback
                    onPress={ () => navigation.navigate('NewsDetail', {url: item.link}) }
            >
                <View style={styles.listings}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image style={styles.thumbnail} source={{uri: item.image_url}} />
                    <Text style={styles.blurb}>{item.description}</Text>
                    <Pressable style={styles.button} onPress={interstitial}>
                        <Text style={styles.text}>Watch Ad</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={rewarded}>
                        <Text style={styles.text}>Watch Reward</Text>
                    </Pressable>
                     <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID="ca-app-pub-2757266309368027/6005143093" // Test ID, Replace with your-admob-unit-id
                            servePersonalizedAds // true or false
                            onDidFailToReceiveAdWithError={bannerError}
                     />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={styles.container}>
            {dataLoading ? <ActivityIndicator /> : (
                <FlatList 
                    data={newsData}
                    renderItem={styoryItem}
                    keyExtractor={item => item.link}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10
    },
    listings: {
        paddingTop: 15,
        paddingBottom: 25,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    title: {
        paddingBottom: 10,
        fontFamily: 'OpenSans',
        fontWeight: 'bold'
    },
    blurb:{
        fontFamily: 'OpenSans',
        fontStyle: 'italic'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },    
});