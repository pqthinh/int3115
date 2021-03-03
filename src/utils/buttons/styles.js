import {StyleSheet, Platform, Dimensions} from 'react-native';

const {width} = Dimensions.get("window");
export const tabButtonStyles = StyleSheet.create({
    btnContainer: {
      flex: 1,
      borderRadius: 10,
      margin: 5,
      paddingHorizontal: 5,
      paddingTop: 10,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: (width - 51) / 3,
      height: (width - 51) / 3
    },
    titleLabel: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    },
    iconStyle: {
      marginBottom: 10,
      width: 60,
      height: 60
    }
});

export const radioButtonStyles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  img: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});

export const checkBoxStyles = StyleSheet.create(
  {
    CheckboxContainer: {
      flex: 1,
      padding: 22,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: (Platform.OS === 'ios') ? 25 : 0
    },
    showSelectedButton: {
      padding: 20,
      marginTop: 25,
      alignSelf: 'stretch',
      backgroundColor: '#5D52FF'
    },
    buttonText: {
      fontSize: 20,
      color: '#ffffff',
      textAlign: 'center',
      alignSelf: 'stretch'
    },
    selectedUI: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkboxTickImg: {
      width: '85%',
      height: '85%',
      tintColor: '#ffffff',
      resizeMode: 'contain'
    },
    uncheckedCheckbox: {
      flex: 1,
      backgroundColor: '#ffffff'
    },
    checkboxLabel: {
      fontSize: 15,
      paddingLeft: 15
    }
});