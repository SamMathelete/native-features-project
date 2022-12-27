import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map, { latlng } from "./screens/Map";
import Place from "./models/Places";
import { useEffect, useState } from "react";
import { init } from "./helpers/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./screens/PlaceDetails";

SplashScreen.preventAutoHideAsync();

type RootParamsList = {
  AllPlaces: undefined;
  AddPlace: latlng;
  Map: {
    lat: number;
    lon: number;
    readOnly: boolean;
  };
  PlaceDetails: {
    id: string;
  };
};

const Stack = createNativeStackNavigator<RootParamsList>();

export default function App() {
  const [dbInitialised, setDbInitialised] = useState<boolean>(false);
  if (dbInitialised) {
    SplashScreen.hideAsync();
  }
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialised(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  size={24}
                  color={tintColor!}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a New Place",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
