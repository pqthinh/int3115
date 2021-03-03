import * as React from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import {checkBoxStyles} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const Checkbox = (props) => {
  const styles = checkBoxStyles;
  const { isCheck, keyValue, value, label, labelColor, color, size} = props;
  const [checked, setChecked] = React.useState(isCheck);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState(isCheck);

  React.useEffect(() => {
    if (checked) {
      setChecked(true);
      setSelectedCheckboxes({
        'key': keyValue,
        'value': value,
        'label': label
      })
    } else {
      setChecked(false);
    }
  },[])

  const stateSwitcher = (key, label, value) => {
    if(checked) {
      setChecked(!checked);
      setSelectedCheckboxes({
        'key': keyValue,
        'value': value,
        'label': label
      })
    } else {
      // selectedCheckboxes.splice(
      //   selectedCheckboxes.findIndex(y => y.key == key), 1
      // );
    }
  }

  return (
    <TouchableHighlight
      onPress={stateSwitcher(keyValue, label, value)}
      underlayColor="transparent"
      style={{ marginVertical: 20 }}>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center' }}>
          <View style={{
            padding: 4,
            width: size,
            height: size,
            backgroundColor: color
          }}>
            {
              (checked)
                ?
                (<View style={styles.selectedUI}>
                  <Icon
                    name="check"
                    backgroundColor="white"
                    color="black"
                    style={styles.checkboxTickImg}
                    size={20}
                  />
                </View>)
                :
                (<View style={styles.uncheckedCheckbox} />)
            }
        </View>
        <Text style={[styles.checkboxLabel, { color: labelColor }]}>
          {label}
        </Text>
      </View>

    </TouchableHighlight>
  );
}

Checkbox.propTypes = {
    keyValue: PropTypes.number.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    labelColor: PropTypes.string,
}

Checkbox.defaultProps = {
    size: 32,
    checked: false,
    value: 'Default',
    label: 'Default',
    color: '#cecece',
    labelColor: '#000000',
}

export default Checkbox;
