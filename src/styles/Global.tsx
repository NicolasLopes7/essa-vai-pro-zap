import { StyleSheet } from "react-native";

export default StyleSheet.create({
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