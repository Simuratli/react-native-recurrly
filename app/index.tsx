import { Link, Stack } from "expo-router";
import { View } from "react-native";
const Home = () => {
  return (
    <View>
      <Stack />

      <Link href="/(auth)/SignIn">Go to Sign In</Link>
      <Link href="/(tabs)/settings">Go to Settings</Link>
      <Link
        href={{
          pathname: "/subscriptions/[id]",
          params: { id: "123" },
        }}
      >
        Go to Subscription 123
      </Link>
    </View>
  );
};

export default Home;
