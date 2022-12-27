import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { InsertPlace } from "../helpers/database";
import Place from "../models/Places";
import { latlng } from "./Map";

type RootParamList = {
  AllPlaces: undefined;
  AddPlace: latlng;
};

type Props = NativeStackScreenProps<RootParamList, "AddPlace">;

const AddPlace: FC<Props> = ({ navigation }) => {
  const createPlaceHandler = async (placeData: Place) => {
    await InsertPlace(placeData);
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onSubmit={createPlaceHandler} />;
};

export default AddPlace;
