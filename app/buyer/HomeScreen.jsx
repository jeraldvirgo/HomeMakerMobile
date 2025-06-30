import { Button, Linking } from "react-native";
export function HomeScreen() {
  const upiUri = `upi://pay?pa=testi@bank&cu=INR&appName=TEST&tn=To&am=1.0&pn=TEST&tr=TEST-1574159602902&url=exp://h.anonymous.m.exp.direct:80&refUrl=exp://h.anonymous.m.exp.direct:80`;
  return (
    <Button
      title="Get installed apps"
      onPress={async () => await Linking.openURL(upiUri)}
    />
  );
}
