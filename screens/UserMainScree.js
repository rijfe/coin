import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoinList from "../components/CoinList";

const UserMainScreen = ({ coinList, owner }) => {
  return (
    <SafeAreaView>
      <FlatList
        data={coinList}
        renderItem={({ item }) => <CoinList title={item.title} value={item.value} owner={owner} />}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "green",
    width: "30%",
    borderRadius: 12,
  },
});

export default UserMainScreen;

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

export const headerOptions = ({ navigation }) => {
  return {
    title: "COIN",
    headerBackVisible: false,
    headerStyle: {
      backgroundColor: "#FFD700",
    },
    headerTintColor: "black",
    headerTitleStyle: {
      fontFamily: "Jua-Regular",
      fontSize: 40,
    },
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="logout"
          iconName={"ios-log-out"}
          onPress={() => {
            navigation.pop();
            AsyncStorage.removeItem("Info");
          }}
        />
      </HeaderButtons>
    ),
  };
};
