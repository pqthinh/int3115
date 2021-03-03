import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  blockInput: {
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#F56C17",
  },
  titleLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  textMark: {
    marginLeft: 15,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    color: "#fff",
    backgroundColor: "#FF0000",
  },
  titleLabelID: {
    paddingTop: 10,
  },
  dropDown100: {
    width: "100%",
    backgroundColor: "#fff",
  },
  blockLabel: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  btnSearch: {
    backgroundColor: "#F56C17",
    borderRadius: 5,
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#808080",
  },
  textInputNote: {
    fontSize: 13,
    fontWeight: "normal",
    paddingTop: 10,
  },
  textInputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
