import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Text } from "react-native";

import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./style";

const DateTimePicker = (props) => {
  const {
    date,
    onChangeDate,
    dateFormat,
    placeholder,
    minDate,
    maxDate,
  } = props;

  const [isPickerVisible, setPickerVisible] = useState(false);

  const togglePicker = useCallback(() => {
    setPickerVisible(!isPickerVisible);
  });

  const renderDateModal = () => {
    return (
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        date={date && date !== "" ? new Date(date) : new Date()}
        minimumDate={minDate || null}
        maximumDate={maxDate || null}
        onConfirm={(date) => {
          onChangeDate && onChangeDate(date);
          togglePicker();
        }}
        onCancel={togglePicker}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Pressable {...props} onPress={togglePicker}>
        <Text style={{ color: date && date !== "" ? "#000000" : "#8b8b8b" }}>
          {date && date !== ""
            ? moment(date).format(dateFormat || "YYYY/MM/DD")
            : placeholder || ""}
        </Text>
      </Pressable>
      {renderDateModal()}
    </View>
  );
};

export default DateTimePicker;
