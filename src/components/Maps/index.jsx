import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, TextInput, FlatList, Pressable, Text } from "react-native";

import { styles } from "./style";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import API from "./api";
import { useDebounce } from "../../hooks";

const Maps = (props) => {
  const { initialRegion, initMarker, isHideSearch } = props;

  const mapRef = useRef();

  const [showMap, setShowMap] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [placeId, setPlaceId] = useState(null);
  const [region, setRegion] = useState(
    initialRegion || {
      latitude: 35.749609,
      longitude: 139.879762,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );
  const [marker, setMarker] = useState(
    initMarker || {
      latitude: 35.749609,
      longitude: 139.879762,
      title: "Shin-Shibamata Sta.",
      description: "新柴又駅",
    }
  );

  const searchDebounce = useDebounce(searchKey, 500);

  useEffect(() => {
    setTimeout(() => {
      setShowMap(true);
    }, 350);
  }, []);

  useEffect(() => {
    onSearch();
  }, [searchDebounce]);

  const onGetGeo = useCallback(() => {
    async function getLocation() {
      const geoResult = await API.getGeometric(placeId);
      const geoDetailResult = await geoResult.json();

      const { location } = geoDetailResult.result.geometry;
      if (location) {
        setMarker({
          latitude: location.lat,
          longitude: location.lng,
          title: placeName,
          description: "",
        });
        setRegion({
          ...region,
          latitude: location.lat,
          longitude: location.lng,
        });
        mapRef.current.fitToElements(true);
      }
    }
    getLocation();
  });

  useEffect(() => {
    if (placeId !== null) {
      onGetGeo();
    }
  }, [placeId]);

  async function onSearch() {
    const result = await API.getAutoCompletePlace(searchKey);
    const placeResult = await result.json();
    setPlaceList(placeResult.predictions);
    if (!placeResult.predictions.length) {
      setPlaceId(null);
    }
  }

  const renderPlaceItem = ({ item }) => {
    const { description, place_id } = item;
    return (
      <Pressable
        style={styles.searchItem}
        onPress={() => {
          setPlaceId(place_id);
          setPlaceName(description);
          setPlaceList([]);
        }}
      >
        <Text style={styles.searchItemText} numberOfLines={2}>
          {description}
        </Text>
      </Pressable>
    );
  };

  const renderSearchBox = () => {
    if (isHideSearch) return null;

    return (
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder={"search"}
            style={styles.searchInput}
            underlineColorAndroid={"transparent"}
            returnKeyType={"search"}
            value={placeName}
            onChangeText={(text) => {
              setSearchKey(text);
              setPlaceName(text);
            }}
          />
        </View>
        {placeList && placeList.length > 0 && (
          <View style={styles.searchResultWrapper}>
            <FlatList
              data={placeList}
              renderItem={renderPlaceItem}
              keyExtractor={(item, index) => `placeItem===${index}`}
            />
          </View>
        )}
      </View>
    );
  };

  const renderBody = () => {
    if (!showMap) return null;
    return (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={region}
      >
        <MapView.Marker
          coordinate={{
            latitude: marker.latitude || 35.749609,
            longitude: marker.longitude || 139.879762,
          }}
          title={marker.title || null}
          description={marker.description || null}
        />
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearchBox()}
      {renderBody()}
    </View>
  );
};

export default Maps;
