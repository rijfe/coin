import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, createRef } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePciker from "expo-image-picker";

import ModalScreen from "./Modal";

const UserInfoScreen = ({ token, id, owner, navigation, sum, dep, img, setImg }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const depInput = createRef();

  const pressButton = () => {
    setModalVisible(true);
  };

  const saveInfo = () => {
    AsyncStorage.setItem(id, JSON.stringify(text));
    AsyncStorage.setItem(id + "photo", JSON.stringify(img));
  };

  const photoHandler = async () => {
    let photo = await ImagePciker.launchImageLibraryAsync({
      mediaTypes: ImagePciker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photo.canceled) {
      console.log(photo.assets[0].uri);
      setImg(photo.assets[0].uri);
    }
  };

  const deleteHandler = () => {
    fetch("http://119.203.225.3/user/user", {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }).then((reponse) => {
      let resData = reponse.json();
      resData.then((result) => {
        if (result.code === "200") {
          AsyncStorage.removeItem("Info");
        }
        navigation.pop();
      });
    });
  };

  return (
    <View style={styles.centered}>
      <View style={styles.size}>
        <TouchableOpacity disabled={!edit} onPress={photoHandler}>
          {img === null ? (
            <Image style={styles.logo} source={require("../assets/free-icon-person-5393061.png")} />
          ) : (
            <Image source={{ u: img }} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.editContainer}>
        <View style={styles.text}>
          <Text style={styles.textsize}>총 보유코인: {sum}개</Text>
        </View>
        <View style={styles.editBntContainer}>
          <View>
            <TouchableOpacity
              style={styles.btnPro}
              onPress={() => {
                setEdit(true);
              }}
            >
              <Icon name="ios-settings" size={20} />
              <Text style={{ fontFamily: "Jua-Regular", fontSize: 20 }}>프로필 편집</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={() => {
                setEdit(false);
                saveInfo();
              }}
            >
              <Icon name="ios-checkmark-sharp" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.userPro}>
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "grey", fontFamily: "Jua-Regular" }}>이름</Text>
        <TextInput style={styles.input} editable={false} defaultValue={owner} />
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "grey", fontFamily: "Jua-Regular" }}>학번</Text>
        <TextInput style={styles.input} editable={false} defaultValue={id} />
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "grey", fontFamily: "Jua-Regular" }}>학과 </Text>
        <TextInput
          style={styles.input}
          editable={edit}
          onChangeText={(department) => {
            setText(department);
          }}
          defaultValue={dep === null ? "" : dep}
          ref={depInput}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.fltBtn} onPress={pressButton}>
        <Icon name="ios-lock-closed" size={30} />
      </TouchableOpacity>
      <ModalScreen modalVisible={modalVisible} setModalVisible={setModalVisible} token={token} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignContent: "center",
    position: "relative",
  },
  size: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  logo: {
    height: 130,
    width: 130,
  },
  text: {
    marginRight: 25,
    justifyContent: "space-around",
    alignItems: "center",
    right: 35,
    fontFamily: "Jua-Regular",
  },
  textsize: {
    fontSize: 20,
    fontFamily: "Jua-Regular",
  },
  floating: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    bottom: 0,
    right: 0,
    top: 460,
  },
  editContainer: {
    flex: 1,
    top: 50,
  },
  editBntContainer: {
    marginTop: 20,
    width: 200,
    flexDirection: "row",
    right: 7,
  },
  userPro: {
    position: "absolute",
    flexDirection: "column",
    top: 220,
    left: 30,
    height: 200,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    width: "90%",
    paddingHorizontal: 2,
    paddingVertical: 7,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 15,
    color: "black",
    fontFamily: "Jua-Regular",
  },
  btnPro: {
    width: 140,
    height: 36,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
  btnSave: {
    width: 50,
    height: 36,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "bold",
  },
  fltBtn: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 30,
    top: 460,
  },
});

export default UserInfoScreen;

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};
