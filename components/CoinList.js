import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const CoinList = ({ title, value, owner }) => {
  const [hide, setHide] = useState(false);

  const hideHandler = () => {
    setHide(!hide);
  };

  return (
    <View style={styles.listContainer}>
      <View style={styles.coinContainer}>
        <View style={styles.circle}></View>
        <Text style={styles.coinTitle}>{title}</Text>
      </View>
      <View style={styles.valueContainer}>
        {hide ? (
          <Text style={{ fontSize: 25, color: "grey", fontFamily: "Jua-Regular" }}>개수 숨김</Text>
        ) : (
          <Text style={styles.valueText}>{value}개</Text>
        )}
      </View>
      <View style={styles.ownerContainer}>
        <Text style={{ fontFamily: "Jua-Regular", fontSize: 20 }}>{owner}</Text>
      </View>
      <TouchableOpacity style={styles.hideBtn} onPress={hideHandler}>
        {hide ? <Text style={{ fontFamily: "Jua-Regular" }}>보기</Text> : <Text style={{ fontFamily: "Jua-Regular" }}>숨김</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: "white",
    margin: 15,
    height: 160,
    borderRadius: 12,
    flex: 1,
    borderWidth: 1,
    borderColor: "#efefef",
  },
  coinTitle: {
    fontSize: 40,
    marginLeft: 8,
    marginTop: 8,
    fontFamily: "Jua-Regular",
  },
  coinContainer: {
    display: "flex",
    flexDirection: "row",
  },
  coin: {
    fontSize: 30,
    marginLeft: 5,
    marginTop: 5,
    fontWeight: "bold",
  },
  valueContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  valueText: {
    fontSize: 35,
    fontFamily: "Jua-Regular",
  },
  ownerContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  hideBtn: {
    borderRadius: 12,
    width: 50,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    shadowColor: "black",
    backgroundColor: "#FFD700",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#ffd700",
    marginLeft: 10,
    marginTop: 20,
    borderColor: "white",
  },
});

export default CoinList;
