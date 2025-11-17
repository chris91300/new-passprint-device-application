import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "./parallax-scroll-view";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
    children: React.ReactNode
}

export default function AuthContainer({children}: Props){


    return(
        <ParallaxScrollView
              headerBackgroundColor={{ light: '#121542', dark: '#1D3D47' }}      
              headerImage={
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={styles.reactLogo}
                />
              }
            >
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">PASSPRINT</ThemedText>   
              </ThemedView>

              { children }
        </ParallaxScrollView>
    )
}



const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 200,
    width: 150,
    bottom: 0,
    left: "50%",
    transform: [{ translateX: '-50%' }],
    position: 'absolute',
  },
})