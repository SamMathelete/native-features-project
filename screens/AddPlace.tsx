import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import Place from "../models/Places";
import { latlng } from "./Map";

type RootParamList = {
  AllPlaces: Place;
  AddPlace: latlng;
};

type Props = NativeStackScreenProps<RootParamList, "AddPlace">;

const AddPlace: FC<Props> = ({ navigation }) => {
  const createPlaceHandler = (placeData: Place) => {
    navigation.navigate("AllPlaces", placeData);
  };
  return <PlaceForm onSubmit={createPlaceHandler} />;
};

export default AddPlace;
