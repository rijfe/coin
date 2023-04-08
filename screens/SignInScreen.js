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
      <View style={styles.LogoContainer}>
        <Image source={require("../assets/logo-removebg-preview.png")} />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(userStdId) => {
            setUserStdId(userStdId);
          }}
          ref={idInputRef}
          placeholder="학번"
          returnKeyType="next"
          onSubmitEditing={() => pwdInputRef.current && pwdInputRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          onChangeText={(userPwd) => {
            setUserPwd(userPwd);
          }}
          ref={pwdInputRef}
          placeholder="비밀번호"
          onSubmitEditing={() => btnRef.current && btnRef.current.focus()}
        />
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")} ref={btnRef}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SignInContainer: {
    flex: 1,
    justifyContent: "center",
  },
  InputContainer: {
    justifyContent: "center",
    alignContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    height: "44%",
    margin: 25,
    width: "88%",
  },
  LogoContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ccc",
    backgroundColor: "#efefef",
    width: "89%",
    height: "18%",
    left: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    height: "12%",
  },
  button: {
    backgroundColor: "#FFD700",
    width: "80%",
    height: "100%",
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
});

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignInScreen;
