import { useEffect } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { useRecoilValue } from "recoil";
import { getToken } from "../store/setToken";
import TradeList from "../components/TradeList";

const UserTradeListScreen = () => {
  const token = useRecoilValue(getToken);
  const data = [
    { title: "coin1", amount: "12", date: "2023.07.17 15:34:25", type: false },
    { title: "coin2", amount: "11", date: "2023.07.17 15:54:25", type: true },
    { title: "coin3", amount: "13", date: "2023.07.17 16:34:25", type: false },
    { title: "coin4", amount: "15", date: "2023.07.17 16:44:25", type: true },
    { title: "coin5", amount: "10", date: "2023.07.17 16:44:35", type: false },
  ];

  const addData = () => {
    for (let i = 1; i < 6; i++) {
      const date = new Date();

      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const dateStr = year + "." + month + "." + day;

      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      const timeStr = hours + ":" + minutes + ":" + seconds;
      data.push({
        title: "coin" + String(Math.floor(Math.random() * (50 - 1) + 1)),
        amount: Math.floor(Math.random() * (20 - 1) + 1),
        date: dateStr + " " + timeStr,
        type: false,
      });
    }
  };

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
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <TradeList title={item.title} amount={item.amount} date={item.date} type={item.type} />}
        keyExtractor={(item) => item.title}
        onEndReached={addData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default UserTradeListScreen;

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};
