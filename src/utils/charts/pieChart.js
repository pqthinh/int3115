import * as React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";

import SVG from "../../utils/icons/svgCustom";

const { width } = Dimensions.get("window");
const pieChart = (props) => {
  const [index, setIndex] = React.useState(1);
  const { SDGsPoint, data } = props;

  React.useEffect(() => {
    let pointMaxIndex = 0;
    let i;

    for (i = 0; i < data.length; i++) {
      data[i].amount = SDGsPoint[i];
    }

    setIndex(pointMaxIndex);
  }, [SDGsPoint]);

  return (
    <View style={styles.container}>
      <PieChart
        style={styles.pieChart}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={"100%"}
        innerRadius={"75%"}
        sort={(a, b) => a.key - b.key}
      />
      <View style={styles.rankIcon}>
        <SVG
          name={data[index].iconName}
          fill={data[index].svg.fill}
          width={50}
          height={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  pieChart: {
    height: width / 3 - 20,
    width: width / 3 - 20,
  },
  rankIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
});

export default pieChart;
