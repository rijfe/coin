import MainNavigator from "./navigation/AppNavigator";
import { RecoilRoot } from "recoil";
import { useFonts } from "expo-font";

export default function App() {
  let [fons] = useFonts({
    "Jua-Regular": require("./assets/font/Jua-Regular.ttf"),
  });
  return (
    <RecoilRoot>
      <MainNavigator />
    </RecoilRoot>
  );
}
