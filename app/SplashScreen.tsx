import { StyleSheet, Text, View , ActivityIndicator, Image} from 'react-native';
export function SplashScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <Image source={require("../assets/app-icon.png")} style={styles.appLogo}/>
          <Text>HomeMaker.com</Text>
          <ActivityIndicator size="large" />
        </View>
      );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    textStyle: {
      textAlign: "left",
      borderColor: "red",
      backgroundColor: "gray",
      borderCurve: "circular",
    },
    button: {
      alignItems: "center",
      backgroundColor: "#FF68AC",
      padding: 10,
      paddingHorizontal: 100,
      borderRadius: 10,
      fontWeight: "normal",
      fontSize: 20,
    },
    input: {
      height: 40,
      margin: 20,
      borderWidth: 1,
      padding: 10,
      paddingHorizontal: 60,
      borderRadius: 10,
    },
    appLogo: {
      padding: 30,
    },
    label: {
      textAlign: "center",
      fontWeight: "normal",
      fontSize: 20,
    },
  });