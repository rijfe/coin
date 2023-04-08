import { createRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Image } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userStdId, setUserStdId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userPwdCheck, setPwdCheck] = useState("");
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
      Alert.alert("이름을 입력해주세요");
      nameInputRef.current.focus();
      return;
    }
    if (!userStdId) {
      Alert.alert("학번을 입력해주세요");
      idInputRef.current.focus();
      return;
    }
    if (!userPwd) {
      Alert.alert("비밀번호를 입력해주세요");
      pwdInputRef.current.focus();
      return;
    }
    if (userPwd != userPwdCheck) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      pwdInputRef.current.focus();
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
      <Image source={require("../assets/logo-removebg-preview.png")} />
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(userName) => {
            setUserName(userName);
          }}
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          placeholder="이름을 입력하세요."
          ref={nameInputRef}
          onSubmitEditing={() => idInputRef.current && idInputRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          onChangeText={(userStdId) => {
            setUserStdId(userStdId);
          }}
          ref={idInputRef}
          placeholder="학번을 입력하세요."
          returnKeyType="next"
          onSubmitEditing={() => pwdInputRef.current && pwdInputRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          onChangeText={(userPwd) => {
            setUserPwd(userPwd);
          }}
          ref={pwdInputRef}
          placeholder="비밀번호를 입력하세요."
          onSubmitEditing={() => pwdchkInputRef.current && pwdchkInputRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          onChangeText={(userPwdCheck) => {
            setPwdCheck(userPwdCheck);
          }}
          ref={pwdchkInputRef}
          placeholder="비밀번호를 다시 입력하세요."
          onSubmitEditing={() => buttonRef.current && buttonRef.current.focus()}
        />
        <View style={styles.line}></View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} ref={buttonRef} onPress={signupHandler}>
            <Text style={styles.buttonText}>가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  InputContainer: {
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    height: 350,
    margin: 20,
    width: "80%",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ccc",
    backgroundColor: "#efefef",
    marginBottom: 15,
    width: "80%",
    left: 36,
    fontFamily: "Jua-Regular",
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
    marginTop: 10,
    borderRadius: 12,
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
});

export default SignUpScreen;

export const screenOptions = () => {
  return {
    headerTitle: "회원가입",
    headerStyle: {
      backgroundColor: "#FFD700",
    },
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: "Jua-Regular",
    },
    headerTitleAlign: "center",
  };
};
