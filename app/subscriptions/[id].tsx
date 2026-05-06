import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SubscriptionPage = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>SubscriptionPage {id}</Text>
      <Link href="/subscriptions">Back to Subscriptions</Link>
    </View>
  );
};

export default SubscriptionPage;
