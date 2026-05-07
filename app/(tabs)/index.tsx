import ListHeading from "@/components/list-heading";
import SubscriptionCard from "@/components/subscription-card";
import UpcomingSubscriptionCard from "@/components/upcomping-subscription-card";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import { formatCurrency } from "@/lib/utils";
import { useUser } from "@clerk/expo";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const Home = () => {
  const { user } = useUser();
  const displayName =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses[0]?.emailAddress ||
    "User";
  const [expandedSubscriptionCardId, setExpandedSubscriptionCardId] = useState<
    string | null
  >(null);
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View>
        <FlatList
          ListHeaderComponent={
            <>
              <View className="home-header">
                <View className="home-user">
                  <Image
                    source={
                      user?.imageUrl ? { uri: user.imageUrl } : images.avatar
                    }
                    className="home-avatar"
                  />
                  <Text className="home-user-name">{displayName}</Text>
                </View>
                <Image source={icons.add} className="home-add-icon" />
              </View>
              <View className="home-balance-card">
                <Text className="home-balance-label">Balance</Text>

                <View className="home-balance-row">
                  <Text className="home-balance-amount">
                    {formatCurrency(HOME_BALANCE.amount)}
                  </Text>
                  <Text className="home-balance-date">
                    {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                  </Text>
                </View>
              </View>
              <View className="mb-5">
                <ListHeading title="Upcoming" />
                <FlatList
                  data={UPCOMING_SUBSCRIPTIONS}
                  renderItem={({ item }) => (
                    <UpcomingSubscriptionCard {...item} />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={
                    <Text className="home-empty-state">
                      No upcoming renewals yet.
                    </Text>
                  }
                />
              </View>
              <ListHeading title="All Subscriptions" />
            </>
          }
          data={HOME_SUBSCRIPTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionCard
              {...item}
              expanded={expandedSubscriptionCardId === item.id}
              onPress={() =>
                setExpandedSubscriptionCardId((prev) =>
                  prev === item.id ? null : item.id,
                )
              }
            />
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
          extraData={expandedSubscriptionCardId}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="home-empty-state">
              No subscriptions found. Start adding some!
            </Text>
          }
          contentContainerClassName="pb-30"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
