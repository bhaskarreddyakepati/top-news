import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView} from 'react-native';

export default function NewsDetail({route, navigation}) {
    const [dataLoading, finishLoading] = useState(true);
    const [allPostData, setAllPostData] = useState([]);
    const { url } = route.params;
    const selectedPost = allPostData.find(post=> post.link === url)
    useEffect(() => {
        fetch("https://newsdata.io/api/1/news?apikey=pub_822385489c7a6540a6f77e4ff4ffe7e21dfd&q=india&language=en")
        .then((response) => response.json())
        .then((json) => setAllPostData(json.results))
        .catch((error) => console.error(error))
        .finally( () => finishLoading(false))
    }, [])
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                    onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttontext}>Go back</Text>
            </TouchableOpacity>
            {dataLoading ? <ActivityIndicator/> :(
                <ScrollView>
                    <Text style= {styles.title}>{selectedPost.title}</Text>
                    {selectedPost.image_url != null ? <Image style={styles.storyImage}
                        source = {{uri: selectedPost.image_url}} />
                       : <Text style= {styles.title}> No Image</Text>
                    }
                    
                    <Text style = {styles.blurb}>{selectedPost.description}</Text>
                    <Text style = {styles.content}>{selectedPost.content}</Text>
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button:{
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    buttontext: {
        fontFamily: 'OpenSans',
        fontWeight: 'bold'
    },
    storyImage: {
        height: 300,
        width: '100%',
    },
    title: {
        fontFamily: 'OpenSans',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 20
    },
    blurb: {
        fontFamily: 'OpenSans',
        fontStyle: 'italic',
        fontSize: 14,
        padding: 20
    },
    content: {
        flex: 1,
        fontFamily: 'OpenSans',
        fontSize: 16,
        paddingTop: 30,
        paddingBottom: 100,
        paddingLeft: 20,
        paddingRight: 20,
    }
})

