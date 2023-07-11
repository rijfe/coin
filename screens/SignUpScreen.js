import { createRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Image } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userStdId, setUserStdId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userPwdCheck, setPwdCheck] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [noFocused, setNoFocused] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);
  const [pwdChFocused, setPwdChFocused] = useState(false);
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const idInputRef = createRef();
  const pwdInputRef = createRef();
  const pwdchkInputRef = createRef();
  const nameInputRef = createRef();
  const buttonRef = createRef();

  const clear = () => {
    idInputRef.current.clear();
    pwdInputRef.current.clear();
    pwdchkInputRef.current.clear();
    nameInputRef.current.clear();
  };

  const signupHandler = () => {
    if (!userName) {
      nameInputRef.current.focus();
      setNameFocused(true);
      setMsg("이름");
      setShowMsg(true);
      return;
    }
    if (!userStdId) {
      idInputRef.current.focus();
      setNoFocused(true);
      setMsg("학번");
      setShowMsg(true);
      return;
    }
    if (!userPwd) {
      pwdInputRef.current.focus();
      setPwdFocused(true);
      setMsg("비밀번호");
      setShowMsg(true);
      return;
    }
    if (userPwd != userPwdCheck) {
      pwdInputRef.current.focus();
      setPwdChFocused(true);
      setMsg("비밀번호 확인");
      setShowMsg(true);
      return;
    }
    fetch("http://119.203.225.3/user/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: userStdId,
        name: userName,
        password: userPwd,
        userRole: "ROLE_STUDENT",
      }),
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
          console.log(result.accessToken);
          setSignupSuccess(true);
        }
      });
    });
  };

  if (signupSuccess) {
    Alert.alert("회원가입에 성공했습니다.", "로그인하세요.", [
      {
        text: "Ok",
        style: "destructive",
        onPress: () => {
          navigation.pop();
          setUserStdId("");
          setUserName("");
          setPwdCheck("");
          setUserPwd("");
        },
      },
    ]);
    setSignupSuccess(false);
  }

  return (
    <View style={styles.center}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.container}></View>
      <View style={styles.InputContainer}>
        <TextInput
          style={nameFocused ? styles.inputName2 : styles.inputName}
          onChangeText={(userName) => {
            setUserName(userName);
            setNameFocused(false);
            setShowMsg(false);
          }}
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          placeholder="   이름"
          ref={nameInputRef}
          onSubmitEditing={() => idInputRef.current && idInputRef.current.focus()}
        />
        <TextInput
          style={noFocused ? styles.inputStdNo2 : styles.inputStdNo}
          onChangeText={(userStdId) => {
            setUserStdId(userStdId);
            setNoFocused(false);
            setShowMsg(false);
          }}
          ref={idInputRef}
          placeholder="   학번"
          returnKeyType="next"
          onSubmitEditing={() => pwdInputRef.current && pwdInputRef.current.focus()}
        />
        <TextInput
          style={pwdFocused ? styles.inputPwd2 : styles.inputPwd}
          onChangeText={(userPwd) => {
            setUserPwd(userPwd);
            setPwdFocused(false);
            setShowMsg(false);
          }}
          ref={pwdInputRef}
          placeholder="   비밀번호"
          onSubmitEditing={() => pwdchkInputRef.current && pwdchkInputRef.current.focus()}
        />
        <TextInput
          style={pwdChFocused ? styles.inputPwdCh2 : styles.inputPwdCh}
          onChangeText={(userPwdCheck) => {
            setPwdCheck(userPwdCheck);
            setPwdChFocused(false);
            setShowMsg(false);
          }}
          ref={pwdchkInputRef}
          placeholder="   비밀번호 확인"
          onSubmitEditing={() => buttonRef.current && buttonRef.current.focus()}
        />

        <TouchableOpacity style={styles.button} ref={buttonRef} onPress={signupHandler}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
        {showMsg ? <Text style={styles.msg}>{msg}를 입력 해주세요</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  InputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "8%",
    backgroundColor: "white",
    height: "61%",
    margin: 20,
    width: "89%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#006AD5",
  },
  inputStdNo: {
    position: "absolute",
    top: "26%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#006AD5",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  inputStdNo2: {
    position: "absolute",
    top: "26%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E9311A",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  inputPwd: {
    position: "absolute",
    top: "43%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#006AD5",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  inputPwd2: {
    position: "absolute",
    top: "43%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E9311A",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  inputPwdCh: {
    position: "absolute",
    top: "60%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#006AD5",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  inputPwdCh2: {
    position: "absolute",
    top: "60%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E9311A",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  inputName: {
    position: "absolute",
    top: "9%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#006AD5",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  inputName2: {
    position: "absolute",
    top: "9%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E9311A",
    backgroundColor: "#FFFFFF",
    width: "89%",
    height: "13%",
    fontFamily: "Jua-Regular",
  },
  container: {
    width: "38%",
    height: "2%",
    backgroundColor: "#D9D9D9",
    position: "absolute",
    top: "23%",
  },
  button: {
    backgroundColor: "#FFD700",
    position: "absolute",
    bottom: "6%",
    width: "89%",
    height: "13%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    position: "relative",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Jua-Regular",
  },
  logo: {
    position: "absolute",
    top: "7%",
    height: "14%",
    width: "24%",
    resizeMode: "center",
  },
  msg: {
    position: "absolute",
    bottom: "19%",
    left: "8%",
  },
});

export default SignUpScreen;

export const screenOptions = () => {
  return {
    // headerTitle: "",
    // headerStyle: {
    //   backgroundColor: "white",
    // },
    // headerTitleStyle: {
    //   fontSize: 30,
    //   fontFamily: "Jua-Regular",
    // },
    // // headerTitleAlign: "center",
    headerShown: false,
  };
};
