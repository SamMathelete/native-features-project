import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

export interface latlng {
  lat: number;
  lon: number;
}

type RootParamList = {
  Map: undefined;
  AddPlace: latlng;
};

type Props = NativeStackScreenProps<RootParamList, "Map">;

const Map: FC<Props> = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState<latlng | null>(null);

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lon = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      lat,
      lon,
    });
  };

  const confirmLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No Location Picked", "Please select a location first.");
      return;
    }
    navigation.navigate("AddPlace", selectedLocation);
  }, [selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        return (
          <IconButton
            name="save"
            size={24}
            color={tintColor!}
            onPress={confirmLocationHandler}
          />
        );
      },
    });
  }, [navigation, confirmLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
