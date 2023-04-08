import { useEffect, useState } from "react";
import { StyleSheet, Animated, SafeAreaView } from "react-native";
import { useRecoilValue } from "recoil";

import UserInfoScreen from "./UserInfoScreen";
import { getToken } from "../store/setToken";
import { getId } from "../store/setId";
import { getOwner } from "../store/setOwner";
import { getCoinSum } from "../store/setCoinSum";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingUserInfoScreen = ({ navigation }) => {
  const spinValue = new Animated.Value(0);
  const [loading, setLoading] = useState(false);
  const [dep, setDep] = useState("");
  const [img, setImg] = useState("");

  const token = useRecoilValue(getToken);
  const id = useRecoilValue(getId);
  const owner = useRecoilValue(getOwner);
  const sum = useRecoilValue(getCoinSum);

  const getDep = () => {
    AsyncStorage.getItem(id).then((result) => {
      const data = JSON.parse(result);
      setDep(data);
      return data;
    });

    console.log(id + "photo");

    AsyncStorage.getItem(id + "photo").then((result) => {
      const url = JSON.parse(result);
      console.log(url);
      setImg(url);
      setLoading(true);
      return url;
    });
  };

  console.log(typeof id);

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    getDep();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return loading ? (
    <UserInfoScreen token={token} id={id} owner={owner} navigation={navigation} sum={sum} dep={dep} img={img} setImg={setImg} />
  ) : (
    <Animated.View style={styles.center}>
      <Animated.Image style={{ transform: [{ rotate: spin }] }} source={require("../assets/loading-removebg-preview.png")} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export default LoadingUserInfoScreen;
