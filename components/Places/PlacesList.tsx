import { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import Place from "../../models/Places";
import PlaceItem from "./PlaceItem";

interface Props {
  places: Place[];
}

const PlacesList: FC<Props> = ({ places }) => {
  const placeSelectHandler = () => {};

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places added yet - Start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <PlaceItem place={item} onSelect={placeSelectHandler} />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
