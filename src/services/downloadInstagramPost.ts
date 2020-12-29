import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

export default async (url: string, extension: string, callback: (downloadProgress: any) => {}) => {
    let cameraPermissions = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if(cameraPermissions.status !== "granted") {
        cameraPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    }
    else {
        const downloadResumable = FileSystem.createDownloadResumable(url, 
            FileSystem.documentDirectory + new Date().getTime().toString() + extension,
            {}, callback)
        try {
            const downloadedFile = await downloadResumable.downloadAsync()
            if(downloadedFile) {
                if(downloadedFile.uri) {
                    return downloadedFile.uri
                } throw new Error("URI is missing")
            } throw new Error("Can't download the file")
        } catch (error) {
            throw new Error("Can' establish connection with the server")
        }
    }
}