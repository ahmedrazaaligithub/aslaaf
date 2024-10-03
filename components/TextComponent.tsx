import {  Text, TextStyle  } from "react-native";
import React from "react";

type TextProps = {
  type?: "2xl" | "xl" | "base"|"sm";
  children: string;
  style?: TextStyle;
};

const TextComponent = ({ children, type,style}: TextProps) => {
  const textStyle = {
    fontSize: type === "2xl" ? 32 : type === "xl" ? 20 :type === "sm" ? 14: 16,
    // fontWeight:type =="2xl" && "bold",
    ...style
  };

  return <Text style={textStyle}>{children}</Text>;
};

export default TextComponent;
