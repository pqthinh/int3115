import * as React from "react";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";

import { pickerSelectStyles } from "./styles";

const DropdownPicker = (props) => {
  const {
    data,
    dataPicker,
    disabled,
    setData,
    field,
    placeholder,
    customStyle,
    value,
    isSearch,
  } = props;

  const [val, setVal] = React.useState(value);

  React.useEffect(() => {
    setVal(value);
  }, [isSearch]);

  const _handleChangeData = (field) => (v) => {
    if (!field) {
      setData(v);
    }

    setVal(v);
    setData({
      ...data,
      [field]: v,
    });
  };

  const placeholderValue = {
    label: placeholder ? placeholder : "選択してください",
    value: null,
    color: "#9EA0A4",
  };

  return (
    <RNPickerSelect
      placeholder={placeholderValue}
      onValueChange={_handleChangeData(field)}
      value={val}
      // value={val || !field ? data : data[field]}
      items={dataPicker}
      style={
        customStyle
          ? customStyle
          : {
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 15,
              },
            }
      }
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return <AntDesign name="caretdown" size={18} color="gray" />;
      }}
      disabled={disabled}
    />
  );
};

export default DropdownPicker;
