import { Text, SafeAreaView , TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import styles from "../styles/Global";
import * as Sharing from "expo-sharing"

export default function Homepage({ route, navigation }) {
    const { previewUrl, postPath, extension } = route.params;


    async function openShareDialog() {
        if(!(await Sharing.isAvailableAsync())) {
          throw new Error("Error in share")
        }
    
        await Sharing.shareAsync(postPath)
      }

    return(    
        <SafeAreaView  style={styles.container}>
          <Image source={{uri: previewUrl}}
          style={styles.thumbnail}/>
    
          <Text style={styles.instructions}>
            Aqui está {extension === ".jpg" ? "a sua imagem!" : "o seu vídeo!"}
          </Text>
    
          <TouchableOpacity onPress={openShareDialog} style={styles.button}>
            <Text style={styles.buttonText}>ESSA VAI PRO ZAP!</Text>
          </TouchableOpacity>
        </SafeAreaView >
    )
}