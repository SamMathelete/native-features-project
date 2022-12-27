import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import Place from "../models/Places";

type RootParamList = {
  AllPlaces: Place;
};

type Props = NativeStackScreenProps<RootParamList, "AllPlaces">;

const AllPlaces: FC<Props> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      console.log(route.params);
      setLoadedPlaces((currState) => [...currState, route.params]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
