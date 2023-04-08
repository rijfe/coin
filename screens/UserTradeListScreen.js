import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRecoilValue } from "recoil";
import { getToken } from "../store/setToken";

const UserTradeListScreen = () => {
  const token = useRecoilValue(getToken);

  const tradeInfoHandler = async () => {
    await fetch("http://119.203.225.3/user/trade?page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response) => {
      let resData = response.json();
      resData.then((result) => {
        console.log(result.transferResponseList);
      });
    });
  };

  useEffect(() => {
    console.log(token);
    tradeInfoHandler();
  }, []);

  return (
    <View>
      <Text>Trade List!</Text>
    </View>
  );
};

export default UserTradeListScreen;

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};
