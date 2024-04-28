import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SimpleGrid } from "react-native-super-grid";
import { router } from "expo-router";
import { recents } from "../../../constants/mock-recent";
import { colors } from "../../../constants/colors";

const color = colors;

const recent = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          width: "100%",
          fontSize: 30,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Recents
      </Text>

      <ScrollView
        horizontal
        scrollEnabled
        style={{
          marginTop: 10,
        }}
      >
        <SimpleGrid
          style={{
            width: "100%",
          }}
          listKey="tools"
          data={recents}
          itemDimension={100}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                //onPress={() => router.replace(item.)}
                activeOpacity={0.5}
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 20,
                }}
              >
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: "stretch",
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item.image_uri,
                  }}
                />
                <Text
                  style={{
                    position: "absolute",
                    marginTop: 44,
                    alignSelf: "center",
                    fontWeight: "900",
                    backgroundColor: "white",
                    borderRadius: 100,
                    height: 20,
                    width: 20,
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default recent;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: 200,
  },
});
