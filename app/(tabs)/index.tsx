import { Link, Stack } from "expo-router";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Stack />
      <Link href="/(auth)/SignIn">Go to Sign In</Link>
      <Link href="/(tabs)/settings">Go to Settings</Link>
    </SafeAreaView>
  );
};

export default Home;
