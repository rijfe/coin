import { useState, createRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, Dimensions, PixelRatio } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setId } from "../store/setId";

const SignInScreen = ({ navigation }) => {
  const [userPwd, setUserPwd] = useState("");
  const [userStdId, setUserStdId] = useState("");
  const pwdInputRef = createRef();
  const idInputRef = createRef();
  const btnRef = createRef();

  const logical = Dimensions.get("window");

  const physicalWidth = logical.width * PixelRatio.get();
  const physicalHeight = logical.height * PixelRatio.get();

  // console.log(physicalWidth);

  // console.log(physicalHeight);
  // // console.log(physicalWidth);

  const clear = () => {
    idInputRef.current.clear();
    pwdInputRef.current.clear();
    idInputRef.current.focus();
  };

  const loginHandler = () => {
    if (!userStdId) {
      Alert.alert("학번을 입력해주세요.");
      return;
    }
    if (!userPwd) {
      Alert.alert("비밀번호를 입력해주세요.");
      return;
    }
    let loginUrl = "http://119.203.225.3/user/login?";
    let id = "identifier=" + userStdId;

    let pwd = "&password=" + userPwd;
    let url = loginUrl + id + pwd;
    fetch(url, {
      method: "GET",
    }).then((response) => {
      let data = response.json();
      data.then((result) => {
        if (result.code === "400") {
          Alert.alert(result.message, "다시 입력해주세요.", [
            {
              text: "Ok",
              style: "destructive",
              onPress: () => {
                clear();
              },
            },
          ]);
        } else {
          navigation.navigate("User");
          //   console.log(result.accessToken);
          let token = result.accessToken;
          AsyncStorage.setItem("Info", JSON.stringify({ token, userStdId }));
          setUserStdId("");
          setUserPwd("");
        }
      });
    });
    clear();
  };

  return (
    <View style={styles.SignInContainer}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.box}></View>
      <View style={styles.textBox}>
        <Text style={{ fontSize: 12 }}>국립 한밭대학교의 은행</Text>
        <Text style={{ fontSize: 12 }}>쉽고 빠르게 코인을 확인하세요!</Text>
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(userStdId) => {
            setUserStdId(userStdId);
          }}
          ref={idInputRef}
          placeholder="   학번"
          returnKeyType="next"
          onSubmitEditing={() => pwdInputRef.current && pwdInputRef.current.focus()}
        />
        <TextInput
          style={styles.inputPwd}
          onChangeText={(userPwd) => {
            setUserPwd(userPwd);
          }}
          ref={pwdInputRef}
          placeholder="   비밀번호"
          onSubmitEditing={() => btnRef.current && btnRef.current.focus()}
        />
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text>아직 회원가입을 안하셨나요?</Text>
        </View>
        <TouchableOpacity
          style={styles.but}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ backgroundColor: "#FFD65380" }}>지금 회원가입을 해보세요!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SignInContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  InputContainer: {
    display: "flex",
    position: "absolute",
    top: "37%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "44%",
    margin: 25,
    width: "89%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#006AD5",
  },
  logo: {
    position: "absolute",
    top: "14%",
    left: "10%",
    height: "14%",
    width: "24%",
    resizeMode: "center",
  },
  input: {
    position: "absolute",
    top: "12%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#006AD5",
    backgroundColor: "white",
    width: "89%",
    height: "18%",
  },
  inputPwd: {
    position: "absolute",
    top: "38%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#006AD5",
    backgroundColor: "white",
    width: "89%",
    height: "18%",
  },
  button: {
    position: "absolute",
    top: "66%",
    backgroundColor: "#FFD700",
    width: "89%",
    height: "18%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Jua-Regular",
  },
  signup: {
    position: "absolute",
    width: "90%",
    height: "6%",
    bottom: "6%",
  },
  but: {
    position: "absolute",
    height: "6%",
    bottom: "6%",
    right: "6%",
  },
  box: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "black",
    top: "13%",
    right: "11%",
    width: "49%",
    height: "12%",
  },
  textBox: {
    width: "39%",
    height: "5%",
    position: "absolute",
    top: "26%",
    right: "20%",
  },
});

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignInScreen;
