import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { colors } from "../../constants/colors";

const color = colors;

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: color.primary,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontSize: 20,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: color.dark,
        tabBarActiveTintColor: color.accent_high,
        tabBarStyle: {
          shadowColor: "transparent",
          borderTopColor: "transparent",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="growth/main"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="growth/recent"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsPage;
