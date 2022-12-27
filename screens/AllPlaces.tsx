import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../helpers/database";
import Place from "../models/Places";

type RootParamList = {
  AllPlaces: undefined;
  PlaceDetails: {
    id: string;
  };
};

type Props = NativeStackScreenProps<RootParamList, "AllPlaces">;

const AllPlaces: FC<Props> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused, fetchPlaces]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
