import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

export const Header = ({
  title,
  onPress,
  nameIcon = "arrow-back",
  sizeIcon = 23,
  colorIcon = "#fff",
  styleProps,
}) => (
  <View style={[styles.container, { ...styleProps }]}>
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name={nameIcon} color={colorIcon} size={sizeIcon} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
  </View>
);
