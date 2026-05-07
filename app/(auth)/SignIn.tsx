import { useClerk, useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SignIn = () => {
  const { signIn } = useSignIn();
  const { setActive } = useClerk();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = async () => {
    if (!signIn) return;
    setLoading(true);
    setError("");
    try {
      const { error: signInError } = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInError) {
        setError(signInError.message ?? "Sign in failed");
        return;
      }
      if (signIn.status === "complete") {
        await setActive({ session: signIn.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Dark header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerLabel}>Login</Text>
        <View style={styles.brandRow}>
          <View style={styles.logoBox}>
            <Image
              source={require("@/assets/icons/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.brandName}>Recurly</Text>
            <Text style={styles.brandTagline}>SMART BILLING</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Cream content area */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue managing your subscriptions
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Enter your email"
            placeholderTextColor="#b0a899"
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#b0a899"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={loading || !emailAddress || !password}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </Pressable>

          <View style={styles.linkRow}>
            <Text style={styles.linkLabel}>New to Recurly? </Text>
            <Link href="/(auth)/SignUp">
              <Text style={styles.link}>Create an account</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#3b2a20",
  },
  header: {
    backgroundColor: "#3b2a20",
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 8,
  },
  headerLabel: {
    color: "#c8b8a8",
    fontSize: 13,
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#ea7a53",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: 32,
    height: 32,
    tintColor: "#fff",
  },
  brandName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "sans-bold",
  },
  brandTagline: {
    color: "#c8b8a8",
    fontSize: 10,
    letterSpacing: 1.5,
    fontFamily: "sans-regular",
  },
  content: {
    flex: 1,
    backgroundColor: "#fdf6e3",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 28,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1209",
    fontFamily: "sans-bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#7a6a55",
    fontFamily: "sans-regular",
    marginBottom: 32,
  },
  form: {
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3b2a20",
    fontFamily: "sans-semibold",
    marginBottom: 2,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e8dcc8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: "#1a1209",
    marginBottom: 8,
  },
  error: {
    color: "#dc2626",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#ea7a53",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "sans-bold",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  linkLabel: {
    fontSize: 14,
    color: "#7a6a55",
    fontFamily: "sans-regular",
  },
  link: {
    fontSize: 14,
    color: "#ea7a53",
    fontWeight: "600",
    fontFamily: "sans-semibold",
  },
});
