import * as React from "react";
import { TextInput, View, StyleSheet } from "react-native";

import SVG from "../icons/svgCustom";

export const SearchInput = (props) => {
  const { placeholder, setFilteredDataSource, masterDataSource } = props;
  const [search, setSearch] = React.useState("");

  const searchFilterFunction = (text) => {
    if (!masterDataSource && !setFilteredDataSource)
      return setSearch(text || "");

    if (text) {
      const newData = masterDataSource.filter(function(item) {
        const itemData = item.first_name
          ? item.first_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        underlineColorAndroid="transparent"
        onChangeText={(search) => searchFilterFunction(search)}
        style={styles.searchBar}
        placeholder={placeholder}
      />
      <SVG
        style={styles.iconSearch}
        name="search"
        width={30}
        height={30}
        fill="#808080"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar: {
    fontSize: 18,
    fontWeight: "normal",
    paddingHorizontal: 20,
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#CCCCCC",
  },
  iconSearch: {
    position: "absolute",
    right: 15,
  },
});
