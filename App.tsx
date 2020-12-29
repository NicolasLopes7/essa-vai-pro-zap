import { Text, SafeAreaView , TouchableOpacity, Image, TextInput, CameraRoll  } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Sharing from "expo-sharing";
import styles from "./src/styles/Global"
import { downloadInstagramPost, getInstagramPostInfo } from "./src/services/index"

const INSTAGRAM_LOGO_URI = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"

export default function App() {
  const [downloadProgress, setDownloadProgress] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [url, setUrl] = useState("")
  const [postUrl, setPostUrl] = useState("")
  const [postPath, setPostPath] = useState("")
  const [extension, setExtension] = useState("")
  const [status, setStatus] = useState("");
  
  
  function handleDownloadProgress(downloadProgress: any) {
    const progress = 100 * (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite);
    setDownloadProgress(progress.toFixed(2))
  }

  async function handleDownload() {
    setStatus("")
    try {
      const { dataUrl, dataPreview, dataExtension } = await getInstagramPostInfo(url)

      setPostUrl(dataUrl)
      setPreviewUrl(dataPreview)
      setExtension(dataExtension)

      const uri = await downloadInstagramPost(dataUrl, dataExtension, handleDownloadProgress)
      if(uri) setPostPath(uri)
    } catch (error) {
      console.error(error)
      setStatus("Falha ao se conectar com o servidor")
    }
  }


  async function openShareDialog() {
    if(!(await Sharing.isAvailableAsync())) {
      setStatus("Tá dando p compartilhar n :( ")
      return
    }

    await Sharing.shareAsync(postPath)
  }

  if(postPath) {
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

      <StatusBar style="auto" />
    </SafeAreaView >
    )
  }

  return (
      <SafeAreaView  style={styles.container}>
        <Image source={{uri: INSTAGRAM_LOGO_URI}}
        style={styles.thumbnail}/>
        
        <Text style={!!status ? styles.error: styles.instructions}>{!!status ? status : "Digite a URL"}</Text>

        <TextInput onChangeText={(text: string) => setUrl(text)} style={styles.input} />

        <TouchableOpacity onPress={handleDownload} style={styles.button}>
          <Text style={styles.buttonText}>Baixar</Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>{downloadProgress !== "" ? `${downloadProgress}%` : ""}</Text>
      </SafeAreaView >
  )

}
