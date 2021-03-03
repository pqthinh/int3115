import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';

import {radioButtonStyles} from './styles';

const radioButton = (props) => {
  const styles = radioButtonStyles;
  const {value, status, onPress} = props;

  return (
    <View style={styles.radioContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.img}>
          {
            status == 'checked' ?
              <View style={styles.btn}/>
              : null
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default radioButton;
