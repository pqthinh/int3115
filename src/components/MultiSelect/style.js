import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#4D4D4D",
  },
  selectedContainer: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  chooseItemText: {
    flex: 1,
    fontSize: 16,
    color: "#6F6F6F",
  },
  listSelected: {
    flexDirection: "column",
    padding: 5,
  },
  selectedItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#4D4D4D",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedItemText: {
    marginRight: 5,
  },
  modalWrapper: {
    flex: 1,
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  formWrapper: {
    width: "90%",
    minHeight: height * 0.6,
    borderRadius: 5,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    marginVertical: 10,
  },
  modalBody: {
    flex: 1,
    padding: 10,
  },
  chooseItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  chooseItemLabel: {
    fontSize: 16,
    flex: 1,
  },
  footerWrapper: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  modalButton: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F56C17",
  },
  modalButtonLabel: {
    fontWeight: "bold",
    color: "white",
  },
  selectContainer: {
    flexDirection: "row",
  },
  dropDownIcon: {
    marginTop: 12,
    marginRight: 10,
  },
});
