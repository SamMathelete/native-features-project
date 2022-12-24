import { FC } from "react";
import {
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Place from "../../models/Places";

interface Props {
  place: ListRenderItemInfo<Place>;
  onSelect: () => void;
}

const PlaceItem: FC<Props> = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.item.imageUri }} />
      <View>
        <Text>{place.item.title}</Text>
        <Text>{place.item.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
