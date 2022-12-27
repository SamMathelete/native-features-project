import { FC, useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import Place from "../../models/Places";
import { latlng } from "../../screens/Map";
import Button from "../UI/RegularButton";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

interface Props {
  onSubmit: (placeData: Place) => void;
}

const PlaceForm: FC<Props> = ({ onSubmit }) => {
  const [enteredTitle, setEnteredTitle] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pickedLocation, setPickedLocation] = useState<latlng | null>(null);

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  const submitHandler = () => {
    if (!enteredTitle || !selectedImage || !pickedLocation) {
      Alert.alert("Incomplete!", "Something's Missing");
      return;
    }
    const placeData = new Place(enteredTitle, selectedImage, {
      latitude: pickedLocation!.lat,
      longitude: pickedLocation!.lon,
    });
    onSubmit(placeData);
  };

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location: latlng) => {
    setPickedLocation(location);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle ? enteredTitle : ""}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={submitHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
