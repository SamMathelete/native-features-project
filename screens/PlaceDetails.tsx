import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../helpers/database";
import Place from "../models/Places";

type RootParamList = {
  PlaceDetails: {
    id: string;
  };
  Map: {
    lat: number;
    lon: number;
    readOnly: boolean;
  };
};

type Props = NativeStackScreenProps<RootParamList, "PlaceDetails">;

const PlaceDetails: FC<Props> = ({ route, navigation }) => {
  const [place, setPlace] = useState<any>(null);
  const selectedPlaceID = route.params.id;

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      lat: place.lat,
      lon: place.lon,
      readOnly: true,
    });
  };

  useEffect(() => {
    const loadPlaceData = async () => {
      console.log(selectedPlaceID);
      const placeData = await fetchPlaceDetails(selectedPlaceID);
      setPlace(placeData);
      console.log(placeData);
      navigation.setOptions({
        title: (placeData as any).title,
      });
    };
    loadPlaceData();
  }, [selectedPlaceID]);

  if (!place) {
    return (
      <View style={styles.fallbackStyle}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{`${place.lat} ${place.lon}`}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallbackStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
