import { useEffect, useState } from "react";
import { StyleSheet, Animated, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { useIsFocused } from "@react-navigation/native";

import UserMainScreen from "./UserMainScree";
import { setToken } from "../store/setToken";
import { setId } from "../store/setId";
import { setOwner } from "../store/setOwner";
import { setCoinSum } from "../store/setCoinSum";

const LoadingScreen = () => {
  const spinValue = new Animated.Value(0);
  const [loading, setLoading] = useState(false);
  const [tok, setTok] = useRecoilState(setToken);
  const [iden, setIden] = useRecoilState(setId);
  const [own, setOwn] = useRecoilState(setOwner);
  const [sum, setSum] = useRecoilState(setCoinSum);
  const [coinList, setCoinList] = useState([]);
  const isFocused = useIsFocused();

  const userAsset = async (token) => {
    await fetch("http://119.203.225.3/user/user", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((reponse) => {
      let resData = reponse.json();
      resData.then((result) => {
        const list = [];
        let total = 0;
        for (let title in result.coin) {
          list.push({
            title: title,
            value: result.coin[title],
          });
          total += result.coin[title];
        }
        setSum(total);
        setCoinList(list);
        setIden(result.identifier);
        setOwn(result.owner);
        setLoading(true);
      });
    });
  };

  const token = () => {
    AsyncStorage.getItem("Info")
      .then((result) => {
        const data = JSON.parse(result);
        setTok(data.token);
        return data.token;
      })
      .then((token) => {
        userAsset(token);
      });
  };

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    token();
  }, [isFocused]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return loading ? (
    <UserMainScreen coinList={coinList} owner={own} />
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

export default LoadingScreen;
