import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { tools } from "../../constants/tools";
import { SimpleGrid } from "react-native-super-grid";
import { useRouter } from "expo-router";
import Growth from "./growth/main";

const color = colors;

const Home = () => {
  const { user } = useUser();
  const router = useRouter();

  //return <Growth />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 18,
              color: color.dark,
            }}
          >
            Welcome to FungAI
          </Text>
        </View>
        <Ionicons
          name="ios-notifications-outline"
          size={24}
          color={color.dark}
        />
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 5,
          margin: 20,
          borderRadius: 100,
          padding: 10,
          paddingHorizontal: 15,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons name="ios-search-outline" size={24} color={color.dark} />
        <TextInput
          placeholder="Search here for tools..."
          placeholderTextColor={color.dark_lo}
          cursorColor={color.accent_low}
        ></TextInput>
      </View>

      {/* Tools Menu */}
      <View style={styles.toolSection}>
        <SimpleGrid
          listKey="tools"
          data={tools}
          itemDimension={150}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => router.replace(item.url)}
                activeOpacity={0.5}
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 20,
                  gap: 10,
                }}
              >
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: "stretch",
                    alignSelf: "center",
                  }}
                  source={item.icon}
                />
                <Text
                  style={{
                    color: color.dark,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: color.primary,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  toolSection: {},
});

export default Home;
