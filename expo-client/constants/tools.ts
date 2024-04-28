import { ImageSourcePropType } from "react-native";

type Tool = {
  name: string;
  icon?: ImageSourcePropType;
  url: string;
};

export const tools: Tool[] = [
  
  {
    name: "Identify Damages",
    icon: require("../public/disease.png"),
    url: "/damage/main",
  },

];
