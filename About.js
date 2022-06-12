import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import About1 from './assets/about1.png';
import About2 from './assets/about2.png';
import About3 from './assets/about3.jpg';

const blockA = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`;

const blockB = `
There are many variations of passages of Lorem Ipsum available, 
but the majority have suffered alteration in some form, by injected humour,
or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,
you need to be sure there isn't anything embarrassing hidden in the middle of text. 
All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
`;

export default function AboutGlobo() {
    return (
        <View style = {styles.container}>
            <ScrollView>
                <Image source={About1} style={{ width: '100%', height: 300}} />
                <Text style = {styles.heading}>We are different</Text>
                <Text style = {styles.text}>{blockA}</Text>
                <Image source={About2} style={{ width: '100%', height: 300}} />
                <Text style = {styles.heading}>Leader in News</Text>
                <Text style = {styles.text}>{blockB}</Text>
                <Image source={About3} style={{ width: '100%', height: 300}} />
                <Text style = {styles.heading}>We deliver up to date information</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    heading: {
        fontFamily: 'OpenSans',
        fontWeight: 'bold',
        paddingTop: 5
    },
    text:{
        fontFamily: 'OpenSans'
    }     
})