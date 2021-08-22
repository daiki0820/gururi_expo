import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default App = () => {
  // マップの中心位置
  const [region, setRegion] = useState({
    latitude: 35.3191887,
    longitude: 139.5467846,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  // 現在地の緯度経度
  const [currentLocation, setCurrentLocation] = useState();

  // 現在地を更新し続ける。
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      await Location.watchPositionAsync({}, (loc) => {
        setCurrentLocation(loc);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.map}
        onMapReady={async () => {
          await Location.requestForegroundPermissionsAsync();
          let currentLocation = await Location.getCurrentPositionAsync();
          setRegion({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          console.log("マップ起動時現在地取得完了");
        }}
      >
        {/* 現在地マーカー */}
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        ></Marker>
      </MapView>

      <View>
        <Button
          onPress={() => {
            setRegion({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            console.log("現在地に移動");
          }}
          title="現在地"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
});
