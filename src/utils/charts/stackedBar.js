import * as React from 'react';
import { StackedBarChart, Grid } from 'react-native-svg-charts';

const StackedBar = ({width}) => {

  const colors = ['#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', '#26BDE2', '#FCC30B', '#A21942', '#FD6925', '#DD1367', '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B', '#00689D', '#19486A']
  const data = [
    {
      noPoverty: {
          value: 120,
          svg: {
              onPress: () => console.log('onPress => 0:noPoverty'),
          },
      },
      zeroHunger: {
          value: 20,
          svg: {
              onPress: () => console.log('onPress => 0:zeroHunger'),
          },
      },
      goodHealthAndWellBeing: {
          value: 6,
          svg: {
              onPress: () => console.log('onPress => 0:goodHealthAndWellBeing'),
          },
      },
      qualityEducation: {
          value: 40,
          svg: {
              onPress: () => console.log('onPress => 0:qualityEducation'),
          },
      },
      genderEquality: {
        value: 30,
        svg: {
            onPress: () => console.log('onPress => 0:genderEquality'),
        }
      },
      cleanWaterAndSanitation: {
        value: 40,
        svg: {
            onPress: () => console.log('onPress => 0:cleanWaterAndSanitation'),
        },
      },
      affordableAndCleanEnergy: {
          value: 30,
          svg: {
              onPress: () => console.log('onPress => 0:affordableAndCleanEnergy'),
          },
      },
      decentWorkAndEconomicGrowth: {
          value: 80,
          svg: {
              onPress: () => console.log('onPress => 0:decentWorkAndEconomicGrowth'),
          },
      },
      industryInnovationAndInfrastructure: {
        value: 30,
        svg: {
            onPress: () => console.log('onPress => 0:industryInnovationAndInfrastructure'),
        }
      },
      reducedInequality: {
        value: 80,
        svg: {
            onPress: () => console.log('onPress => 0:reducedInequality'),
        },
      },
      sustainableCitiesAndCommunities: {
          value: 20,
          svg: {
              onPress: () => console.log('onPress => 0:sustainableCitiesAndCommunities'),
          },
      },
      responsibleConsumptionAndProduction: {
          value: 60,
          svg: {
              onPress: () => console.log('onPress => 0:responsibleConsumptionAndProduction'),
          },
      },
      climateAction: {
          value: 40,
          svg: {
              onPress: () => console.log('onPress => 0:climateAction'),
          },
      },
      lifeBelowWater: {
        value: 30,
        svg: {
            onPress: () => console.log('onPress => 0:lifeBelowWater'),
        }
      },
      lifeOnLand: {
        value: 40,
        svg: {
            onPress: () => console.log('onPress => 0:lifeOnLand'),
        },
      },
      peaceAndJusticeStrongInstitutions: {
        value: 30,
        svg: {
            onPress: () => console.log('onPress => 0:peaceAndJusticeStrongInstitutions'),
        }
      },
      partnershipsToAchieveTheGoal: {
        value: 120,
        svg: {
            onPress: () => console.log('onPress => 0:partnershipsToAchieveTheGoal'),
        },
      }
    }
  ]

  const keys = ['noPoverty', 'zeroHunger', 'goodHealthAndWellBeing', 'qualityEducation', 'genderEquality', 'cleanWaterAndSanitation', 'affordableAndCleanEnergy', 'decentWorkAndEconomicGrowth', 'industryInnovationAndInfrastructure', 'reducedInequality', 'sustainableCitiesAndCommunities', 'responsibleConsumptionAndProduction', 'climateAction', 'lifeBelowWater', 'lifeOnLand', 'peaceAndJusticeStrongInstitutions', 'partnershipsToAchieveTheGoal']

  return (
    <StackedBarChart
      style={{ height: 25, width: 7 * width / 10 }}
      colors={colors}
      contentInset={{ top: 30, bottom: 30 }}
      data={data}
      keys={keys}
      horizontal={true}
      valueAccessor={({ item, key }) => item[key].value}
    >
      <Grid />
    </StackedBarChart>
  )
};

export default StackedBar;
