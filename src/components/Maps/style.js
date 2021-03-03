import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    borderWidth: 2,
    borderColor: "#808080",
    width: width - 20,
    height: width - 20,
  },
  searchWrapper: {
    position: "absolute",
    zIndex: 99,
    top: 0,
    left: 0,
    width: "100%",
    alignItems: "center",
  },
  searchBox: {
    backgroundColor: "white",
    width: "85%",
    height: 36,
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchResultWrapper: {
    backgroundColor: "white",
    width: "85%",
    marginTop: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  searchItem: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  searchItemText: {
    fontSize: 14,
  },
});
