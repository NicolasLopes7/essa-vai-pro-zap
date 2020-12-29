import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView , TouchableOpacity, Image, TextInput, CameraRoll  } from 'react-native';
import * as Sharing from "expo-sharing";
import * as axios from "axios";
import * as Permisions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import getInstagramPost from "./src/services/getInstagramPostInfo"
const INSTAGRAM_LOGO_URI = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"

interface PostResponse {
  items: [{
    comments: number;
    likes: number;
    post_url: string;
    preview: string;
    text: string;
    type: string;
    url: string;
  }]
}

export default function App() {
  const [downloadProgress, setDownloadProgress] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [url, setUrl] = useState("")
  const [postUrl, setPostUrl] = useState("")
  const [postPath, setPostPath] = useState("")
  const [extension, setExtension] = useState("")
  const [status, setStatus] = useState("");
  
  function handleError(error: boolean, value: string) {
    setStatus(value)
  }
  function handleDownloadProgress(downloadProgress: any) {
    const progress = 100 * (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite);
    setDownloadProgress(progress.toFixed(2))
  }

  async function getSetInstagramPostData() {
    handleError(false, "")
    const postRequestUrl = url.split("/?")[0]
    try {
      const {data: {items}} = await axios.default.get<PostResponse>(`https://instagram-post-proxy.herokuapp.com/?postUrl=${postRequestUrl}`)
      console.log(items)
      const item = items[0];

      (async () => {
        setPreviewUrl(item.preview)
        setPostUrl(item.url)
        setExtension(item.type === "video" ? ".mp4" : ".jpg")
      })()

      return {
        dataUrl: item.url,
        dataExtension: item.type === "video" ? ".mp4" : ".jpg"
      }
    } catch (error) {
      handleError(true, "Ocorreu um erro no servidor")
      console.warn(error)
      return false;
    }
  }
  

  async function handleDownload() {
    const data = await getSetInstagramPostData()
    if(data !== false) {
      const { dataUrl, dataExtension } = data
      let  cameraPermissions = await Permisions.getAsync(Permisions.CAMERA_ROLL)
      if(cameraPermissions.status !== "granted") {
        cameraPermissions = await Permisions.askAsync(Permisions.CAMERA_ROLL)
      }
      else {  
          const downloadResumable = FileSystem.createDownloadResumable(dataUrl,  FileSystem.documentDirectory + new Date().getTime().toString() + dataExtension, {}, handleDownloadProgress)
          try {
            const downloadedFile = await  downloadResumable.downloadAsync()
            if(downloadedFile) {
              if(downloadedFile.uri) {
                setPostPath(downloadedFile.uri)
              }
            }
          } catch (error) {
            console.error(error)
          }
      }
    }

  }

  function clearState() {
    setDownloadProgress("")
    setPreviewUrl("")
    setUrl("")
    setPostUrl("")
    setPostPath("")
    setExtension("")
    setStatus("")
  }

  async function openShareDialog() {
    if(!(await Sharing.isAvailableAsync())) {
      setStatus("Tá dando p compartilhar n :( ")
      return
    }

    await Sharing.shareAsync(postPath)
    clearState()

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    alignSelf: "flex-start"
  },
  instructions : {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  error : {
    color: "#ff0000",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#eee",
    marginTop: 15,
    padding: 20,
    borderRadius: 5
  },
  input: {
    backgroundColor: "#eee",
    color: "#000",
    borderRadius: 5,
    padding: 20,
    width: "80%"
  },
  buttonText: {
    fontSize: 20,
    color: "#000"
  }

});
