import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface Props {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size: number;
  onPress: () => void;
}

const IconButton: FC<Props> = ({ name, color, size, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
