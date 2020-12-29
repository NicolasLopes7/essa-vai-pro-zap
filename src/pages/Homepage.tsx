import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView , TouchableOpacity, Image, TextInput, CameraRoll  } from 'react-native';
import * as Sharing from "expo-sharing";
import * as axios from "axios";
import * as Permisions from "expo-permissions";
import * as FileSystem from "expo-file-system";

export default function Homepage() {
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

    
}