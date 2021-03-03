import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import Rank1Star from '../../assets/SDGs_logos/rank1Star.svg';
import Rank2Star from '../../assets/SDGs_logos/rank2Star.svg';
import Rank3Star from '../../assets/SDGs_logos/rank3Star.svg';
import Rank4Star from '../../assets/SDGs_logos/rank4Star.svg';
import Rank5Star from '../../assets/SDGs_logos/rank5Star.svg';

const styles = StyleSheet.create({
  rankStarStyle: {
    width: 110,
    height: 110
  },
});
const StarIcon = ({ numberStar }) => {
  const rankStar = () => {
    switch(numberStar) {

      case 1: return <Image style={{
        width: 120,
        height: 120,
      }} source={require('../../assets/SDGs_logos/rank1Star.png')} />;
      case 2: return <Image style={{
        width: 120,
        height: 120,
      }} source={require('../../assets/SDGs_logos/rank2Star.png')} />;
      case 3: return <Image style={{
        width: 120,
        height: 120,
      }} source={require('../../assets/SDGs_logos/rank3Star.png')} />;
      case 4: return <Image style={{
        width: 120,
        height: 120,
      }} source={require('../../assets/SDGs_logos/rank4Star.png')} />;
      case 5: return <Image style={{
        width: 120,
        height: 120,
      }} source={require('../../assets/SDGs_logos/rank5Star.png')} />;
      default: return <Rank1Star style={styles.rankStarStyle}/>
    }
  }
  return (
    rankStar()
  )
}

StarIcon.propTypes = {
  numberStar: PropTypes.number,
}

export default StarIcon;
