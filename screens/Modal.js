import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState, createRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

const ModalScreen = (props) => {
  const [userPwd, setUserPwd] = useState("");
  const [userPwdCheck, setPwdCheck] = useState("");

  const pwdInputRef = createRef();
  const pwdchkInputRef = createRef();
  const btnRef = createRef();

  const clear = () => {
    pwdchkInputRef.current.clear();
    pwdInputRef.current.clear();
    pwdInputRef.current.focus();
  };

  const { modalVisible, setModalVisible, token, navigation } = props;
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const changePwd = (props) => {
    if (!userPwd) {
      Alert.alert("비밀번호를 입력해주세요");
      return;
    }
    if (userPwd === userPwdCheck) {
      fetch(`http://119.203.225.3/user/user?newPassword=${userPwdCheck}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        let res = response.json();
        console.log(res);
        res.then((result) => {});
        navigation.pop();
        AsyncStorage.removeItem("Info");
      });
    } else {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      clear();
      return;
    }
  };
  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  return (
    <Modal visible={modalVisible} animationType={"fade"} transparent statusBarTranslucent>
      <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View style={{ ...styles.bottomSheetContainer, transform: [{ translateY: translateY }] }} {...panResponders.panHandlers}>
          <View style={styles.Input}>
            <View style={styles.titleCon}>
              <Text style={styles.title}>비밀번호 변경</Text>
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="새로운 비밀번호"
                onChangeText={(userPwd) => {
                  setUserPwd(userPwd);
                }}
                ref={pwdInputRef}
                returnKeyType="next"
                onSubmitEditing={() => {
                  pwdchkInputRef.current && pwdchkInputRef.current.focus();
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                onChangeText={(userPwdCheck) => {
                  setPwdCheck(userPwdCheck);
                }}
                ref={pwdchkInputRef}
                onSubmitEditing={() => {
                  btnRef.current;
                }}
              />
              <TouchableOpacity style={styles.btn} onPress={changePwd}>
                <Text style={styles.btnText}>변경하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "stretch",
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
    fontFamily: "Jua-Regular",
  },
  Input: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  container: {
    width: "70%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "Jua-Regular",
  },
  change: {
    right: 0,
    top: 165,
    position: "absolute",
    width: "25%",
    height: 100,
  },
  titleCon: {
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  btn: {
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "80%",
    height: 38,
    marginTop: 10,
  },
  btnText: {
    fontFamily: "Jua-Regular",
    fontSize: 20,
  },
});

export default ModalScreen;
