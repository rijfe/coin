import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const StartScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem("Info", (err, result) => {
        if (result) {
          navigation.navigate("User");
        } else {
          navigation.navigate("SignIn");
        }
      });
    }, 1000);
  }, [isFocused]);

  return (
    <View style={styles.center}>
      <Image source={require("../assets/logo-removebg-preview.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default StartScreen;

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};
