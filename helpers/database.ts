import * as SQLite from "expo-sqlite";
import Place from "../models/Places";

const database = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
                    CREATE TABLE IF NOT EXISTS placeList (
                        id INTEGER PRIMARY KEY,
                        title TEXT NOT NULL,
                        imageUri TEXT NOT NULL,
                        lat REAL NOT NULL,
                        lon REAL NOT NULL
                    )
                `,
        [],
        () => resolve(),
        (_, error): boolean | any => reject(error)
      );
    });
  });
  return promise;
};

export const InsertPlace = (place: Place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO placeList (title, imageUri, lat, lon)
                VALUES (?, ?, ?, ?)
                `,
        [
          place.title,
          place.imageUri,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error): any => reject(error)
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM placeList`,
        [],
        (_, result) => {
          const places: Place[] = [];
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  latitude: dp.lat,
                  longitude: dp.lon,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error): any => reject(error)
      );
    });
  });
  return promise;
};

export const fetchPlaceDetails = (id: string) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM placeList WHERE id = ?`,
        [id],
        (_, result) => {
          console.log(result.rows._array[0]);
          resolve(result.rows._array[0]);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
