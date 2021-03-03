import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts';
import {Text, View, StyleSheet} from 'react-native';

const PercentageCircle = (props) => {
  const {progress, strokeWidth, width, height, progressColor, pointNumber} = props;

  return (
    <ProgressCircle
      style={{ height: height , width: width }}
      progress={progress}
      progressColor={progressColor}
      strokeWidth={strokeWidth}
    >
      <View style={styles.container}>
        <Text style={styles.nextRankTitle}>あと</Text>
        <View style={styles.nextRankPoint}>
          <Text style={styles.nextRankPointNumber}>{pointNumber}</Text>
          <Text style={styles.nextRankSmallTitle}>pt</Text>
        </View>
      </View>
    </ProgressCircle>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextRankContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  nextRankTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  nextRankPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextRankPointNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F56C17',
    paddingHorizontal: 5
  },
  nextRankSmallTitle: {
    fontSize: 15,
    color: '#F56C17',
    top: 5
  },
});

export default PercentageCircle;
