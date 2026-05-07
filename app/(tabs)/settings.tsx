import images from "@/constants/images";
import { useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const SettingsRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    {value ? <Text style={styles.rowValue}>{value}</Text> : null}
  </View>
);

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/SignIn");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.pageTitle}>Settings</Text>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <Image
            source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.fullName ?? user?.firstName ?? "User"}
            </Text>
            <Text style={styles.profileEmail}>
              {user?.emailAddresses?.[0]?.emailAddress ?? ""}
            </Text>
          </View>
        </View>

        {/* Account section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <SettingsRow label="Full name" value={user?.fullName} />
          <View style={styles.divider} />
          <SettingsRow
            label="Email"
            value={user?.emailAddresses?.[0]?.emailAddress}
          />
          <View style={styles.divider} />
          <SettingsRow
            label="Member since"
            value={
              user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : undefined
            }
          />
        </View>

        {/* Sign out */}
        <Pressable
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.signOutPressed,
          ]}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#081126",
    fontFamily: "sans-bold",
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e7",
    borderRadius: 16,
    padding: 16,
    gap: 14,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.07)",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e8dcc8",
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#081126",
    fontFamily: "sans-bold",
  },
  profileEmail: {
    fontSize: 13,
    color: "rgba(0,0,0,0.5)",
    fontFamily: "sans-regular",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(0,0,0,0.4)",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "sans-semibold",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff8e7",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.07)",
    marginBottom: 32,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLabel: {
    fontSize: 15,
    color: "#081126",
    fontFamily: "sans-medium",
  },
  rowValue: {
    fontSize: 14,
    color: "rgba(0,0,0,0.45)",
    fontFamily: "sans-regular",
    maxWidth: "55%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
    marginHorizontal: 16,
  },
  signOutButton: {
    backgroundColor: "#ea7a53",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  signOutPressed: {
    opacity: 0.75,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "sans-bold",
  },
});
