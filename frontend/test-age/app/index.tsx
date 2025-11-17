import { View } from "react-native";
import { styles } from "./_layout";
import ContentFrame from "./source/ContentFrame";

export default function Index() {
  return (
    <View style={styles.container}>
      <ContentFrame/>
    </View>
  );
}
