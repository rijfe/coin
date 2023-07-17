import { View, Text, StyleSheet } from "react-native";

const TradeList = ({ title, amount, date, type }) => {
  return (
    <View style={styles.box}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.type}>{type ? "In" : "Out"}</Text>
        <Text style={type ? styles.amountIn : styles.amountOut}>{amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "80%",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "grey",
  },
  title: {
    fontSize: 25,
    position: "absolute",
    top: 30,
  },
  amountOut: {
    fontSize: 25,
    position: "absolute",
    right: 10,
    bottom: 3,
    color: "red",
  },
  amountIn: {
    fontSize: 25,
    color: "blue",
    position: "absolute",
    right: 10,
    bottom: 3,
  },
  date: {
    fontSize: 15,
    position: "absolute",
    top: 15,
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  type: {
    fontSize: 25,
    position: "absolute",
    right: 50,
    bottom: 3,
  },
});

export default TradeList;
