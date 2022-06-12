import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Home';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './Header';
import Footer from './Footer';
import { navigationRef } from './RootNavigation';
import NewsDetail from './NewsDetail';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AboutGlobo from './About';

const Stack = createStackNavigator();

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync().catch(console.warn); // it's good to explicitly catch and inspect any error

export default function App(){

  const [isReady, setIsReady] = useState(false);

  const startup = async () => {
    try {
      await Font.loadAsync({
        OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    startup();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer style={{ paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight: 0}}
      ref = {navigationRef}
    >
      <Stack.Navigator initialRouteName='Globomantics' screenOptions={{ headerMode : 'screen' }}>
        <Stack.Screen name="Globomantics" component={HomePage} 
        options = {{
          header: () => <Header headerDisplay="Top News" />
        }}
        />
         <Stack.Screen name="NewsDetail" component={NewsDetail} 
        options = {{
          header: () => <Header headerDisplay="Detail News" />
        }}
        />
        <Stack.Screen name="About" component={AboutGlobo} 
        options = {{
          header: () => <Header headerDisplay="About Top News" />
        }}
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};